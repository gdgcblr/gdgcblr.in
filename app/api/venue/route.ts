import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export interface VenueSubmission {
  id: string;
  createdAt: string;
  // Contact Person
  contactName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  linkedinUrl: string;
  // Venue Info
  venueName: string;
  locationArea: string;
  fullAddress: string;
  capacity: string;
  venueType: string;
  availableDays: string;
  amenities: string[];
  securityRequirements?: string;
  sponsorshipNotes?: string;
  acceptedCodeOfConduct: boolean;
  savedToFirebase?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const data: Partial<VenueSubmission> = await req.json();

    // 1. Mandatory Validations
    if (!data.contactName || data.contactName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter the contact person's full name." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      return NextResponse.json({ error: "Please provide a valid work email address." }, { status: 400 });
    }

    // 10-digit mobile number validation
    const rawPhone = data.phone?.trim() || "";
    const phoneDigits = rawPhone.replace(/\D/g, "");
    const isValid10Digit =
      phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
    if (!isValid10Digit) {
      return NextResponse.json(
        { error: "Mobile number is mandatory and must contain exactly 10 digits." },
        { status: 400 }
      );
    }

    if (!data.company?.trim()) {
      return NextResponse.json({ error: "Company or campus name is mandatory." }, { status: 400 });
    }

    if (!data.locationArea?.trim()) {
      return NextResponse.json({ error: "Please provide the city area/neighborhood (e.g., Bellandur, Indiranagar)." }, { status: 400 });
    }

    if (!data.capacity?.trim()) {
      return NextResponse.json({ error: "Please select the seating capacity range." }, { status: 400 });
    }

    if (!data.venueType?.trim()) {
      return NextResponse.json({ error: "Please select the venue type." }, { status: 400 });
    }

    if (!data.linkedinUrl?.trim()) {
      return NextResponse.json({ error: "LinkedIn profile URL is mandatory." }, { status: 400 });
    }

    if (!data.acceptedCodeOfConduct) {
      return NextResponse.json({ error: "Please agree to the community guidelines and Code of Conduct." }, { status: 400 });
    }

    // Generate unique ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionId = `GDG-VEN-2026-${randomHex}`;

    const submission: VenueSubmission = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      contactName: data.contactName.trim(),
      email: data.email.trim(),
      phone: rawPhone,
      role: data.role?.trim() || "Host Coordinator",
      company: data.company.trim(),
      linkedinUrl: data.linkedinUrl.trim(),
      venueName: data.venueName?.trim() || data.company.trim(),
      locationArea: data.locationArea.trim(),
      fullAddress: data.fullAddress?.trim() || "",
      capacity: data.capacity.trim(),
      venueType: data.venueType.trim(),
      availableDays: data.availableDays || "Saturdays (Full Day)",
      amenities: data.amenities || [],
      securityRequirements: data.securityRequirements?.trim() || "",
      sponsorshipNotes: data.sponsorshipNotes?.trim() || "",
      acceptedCodeOfConduct: Boolean(data.acceptedCodeOfConduct),
    };

    let savedToFirebase = false;

    // 1. Save to Firestore in collection "venue_submissions"
    try {
      const docRef = doc(db, "venue_submissions", submissionId);
      await setDoc(docRef, {
        ...submission,
        serverTimestamp: serverTimestamp(),
      });
      savedToFirebase = true;
      console.log(`[Firebase] Successfully saved Venue submission ${submissionId} to Firestore.`);
    } catch (fbError) {
      console.error("[Firebase] Error saving venue to Firestore:", fbError);
    }

    // 2. Local Backup in data/venue_submissions.json
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "venue_submissions.json");
      let submissions: VenueSubmission[] = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(fileContent);
      }
      submissions.push({ ...submission, savedToFirebase });
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
    } catch (fsError) {
      console.warn("Could not write venue to local backup file:", fsError);
    }

    return NextResponse.json(
      {
        success: true,
        id: submissionId,
        message: "Your venue proposal has been submitted to GDG Cloud Bengaluru!",
        timestamp: submission.createdAt,
        savedToFirebase,
        summary: {
          contactName: submission.contactName,
          company: submission.company,
          capacity: submission.capacity,
          locationArea: submission.locationArea,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error processing venue submission:", err);
    return NextResponse.json(
      { error: "Internal server error processing venue submission. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    event: "GDG Cloud Bengaluru Venue Partner Intake 2026",
    collection: "venue_submissions",
    capacities: ["50 - 100 Attendees", "100 - 200 Attendees", "200 - 400 Attendees", "400+ Flagship Auditorium"],
  });
}
