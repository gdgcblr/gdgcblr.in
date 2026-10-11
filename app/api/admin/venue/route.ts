import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ADMIN_PASSWORD = process.env.CFP_ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!ADMIN_PASSWORD || !password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin password. Access denied." },
        { status: 401 }
      );
    }

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
