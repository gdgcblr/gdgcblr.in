import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import {
  getClientIp,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  secureCompare,
} from "@/app/lib/rateLimit";

const ADMIN_PASSWORD = process.env.CFP_ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. Check rate limit
    const limitStatus = checkRateLimit(ip);
    if (limitStatus.isLimited) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts from your IP. Please try again in ${Math.ceil(
            limitStatus.retryAfterSeconds / 60
          )} minutes.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(limitStatus.retryAfterSeconds) },
        }
      );
    }

    const { password } = await req.json();

    // 2. Validate password with timing-safe comparison
    const isPasswordValid =
      Boolean(ADMIN_PASSWORD) &&
      typeof password === "string" &&
      secureCompare(password, ADMIN_PASSWORD!);

    if (!isPasswordValid) {
      const remaining = recordFailedAttempt(ip);
      return NextResponse.json(
        {
          error:
            remaining > 0
              ? `Invalid admin password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
              : "Too many failed login attempts. Access locked for 15 minutes.",
        },
        { status: 401 }
      );
    }

    // 3. Reset rate limit on successful authentication
    resetRateLimit(ip);

    let venues: any[] = [];
    let firestoreQueried = false;

    // 1. Fetch from Firestore collection "venue_submissions"
    try {
      const q = query(collection(db, "venue_submissions"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        venues.push({ id: doc.id, ...doc.data() });
      });
      firestoreQueried = true;
      console.log(`[Admin] Retrieved ${venues.length} venue submissions from Firestore.`);
    } catch (fbErr) {
      console.warn("[Admin] Could not query Firestore venues, checking local backup file:", fbErr);
    }

    // 2. Only fallback to local backup if Firestore query failed
    if (!firestoreQueried) {
      try {
        const filePath = path.join(process.cwd(), "data", "venue_submissions.json");
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          venues = JSON.parse(fileContent);
        }
      } catch (localErr) {
        console.warn("[Admin] Local venue backup error:", localErr);
      }
    }

    // Sort newest first
    venues.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({
      success: true,
      total: venues.length,
      venues,
    });
  } catch (error: any) {
    console.error("[Admin API] Error fetching venues:", error);
    return NextResponse.json(
      { error: "Server error retrieving venue responses." },
      { status: 500 }
    );
  }
}
