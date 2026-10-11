import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";

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

    let volunteers: any[] = [];
    let firestoreQueried = false;

    // 1. Fetch from Firestore (Single Source of Truth)
    try {
      const q = query(collection(db, "volunteer_submissions"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        volunteers.push({ id: doc.id, ...doc.data() });
      });
      firestoreQueried = true;
      console.log(`[Admin] Retrieved ${volunteers.length} volunteer submissions from Firestore.`);
    } catch (fbErr) {
      console.warn("[Admin] Could not query Firestore volunteers, checking local backup file:", fbErr);
    }

    // 2. Only fallback to local backup if Firestore query failed
    if (!firestoreQueried) {
      try {
        const filePath = path.join(process.cwd(), "data", "volunteer_submissions.json");
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          volunteers = JSON.parse(fileContent);
        }
      } catch (localErr) {
        console.warn("[Admin] Local volunteer backup error:", localErr);
      }
    }

    // Sort newest first
    volunteers.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({
      success: true,
      total: volunteers.length,
      volunteers,
    });
  } catch (error: any) {
    console.error("[Admin API] Error fetching volunteers:", error);
    return NextResponse.json(
      { error: "Server error retrieving volunteer responses." },
      { status: 500 }
    );
  }
}

// DELETE Volunteer Endpoint
export async function DELETE(req: NextRequest) {
  try {
    const { password, id } = await req.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Volunteer ID required" }, { status: 400 });
    }

    // 1. Delete from Firestore
    try {
      await deleteDoc(doc(db, "volunteer_submissions", id));
      console.log(`[Admin] Deleted volunteer ${id} from Firestore.`);
    } catch (fbErr) {
      console.warn("[Admin] Error deleting volunteer from Firestore:", fbErr);
    }

    // 2. Remove from local backup file
    try {
      const filePath = path.join(process.cwd(), "data", "volunteer_submissions.json");
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const list = JSON.parse(fileContent);
        const filtered = list.filter((item: any) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf-8");
      }
    } catch (localErr) {
      console.warn("[Admin] Error cleaning local volunteer file:", localErr);
    }

    return NextResponse.json({ success: true, message: `Volunteer ${id} deleted.` });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete volunteer" }, { status: 500 });
  }
}
