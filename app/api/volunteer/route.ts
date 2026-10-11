import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export interface VolunteerSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  status: string; // Student | Working Professional | Other
  organization: string;
  city: string;
  headshotUrl: string;
  linkedinUrl: string;
  githubUrl?: string;
  twitterHandle?: string;
  portfolioUrl?: string;
  primaryRole: string; // Operations, Registration, Design, Tech, etc.
  secondaryRoles?: string[];
  availability: string;
  priorExperience: string;
  motivation: string;
  skills?: string;
  tshirtSize?: string;
  acceptedCodeOfConduct: boolean;
  savedToFirebase?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const data: Partial<VolunteerSubmission> = await req.json();

    // 1. Mandatory Validations
    if (!data.fullName || data.fullName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
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

    if (!data.organization?.trim()) {
      return NextResponse.json(
        { error: "College, company, or organization is mandatory." },
        { status: 400 }
      );
    }

    if (!data.headshotUrl || data.headshotUrl.trim().length === 0) {
      return NextResponse.json(
        { error: "Profile photo is mandatory. Please upload an image." },
        { status: 400 }
      );
    }

    if (!data.linkedinUrl || data.linkedinUrl.trim().length < 4) {
      return NextResponse.json(
        { error: "LinkedIn profile URL is mandatory." },
        { status: 400 }
      );
    }

    if (!data.primaryRole?.trim()) {
      return NextResponse.json(
        { error: "Please select your primary area of volunteer interest." },
        { status: 400 }
      );
    }

    if (!data.motivation || data.motivation.trim().length < 15) {
      return NextResponse.json(
        { error: "Please tell us why you want to volunteer (minimum 15 characters)." },
        { status: 400 }
      );
    }

    if (!data.acceptedCodeOfConduct) {
      return NextResponse.json(
        { error: "You must agree to the Code of Conduct to apply." },
        { status: 400 }
      );
    }

    // Generate unique ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionId = `GDG-VOL-2026-${randomHex}`;

    const submission: VolunteerSubmission = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: rawPhone,
      status: data.status || "Working Professional",
      organization: data.organization.trim(),
      city: data.city?.trim() || "Bengaluru",
      headshotUrl: data.headshotUrl,
      linkedinUrl: data.linkedinUrl.trim(),
      githubUrl: data.githubUrl?.trim() || "",
      twitterHandle: data.twitterHandle?.trim() || "",
      portfolioUrl: data.portfolioUrl?.trim() || "",
      primaryRole: data.primaryRole.trim(),
      secondaryRoles: data.secondaryRoles || [],
      availability: data.availability || "Full-day offline events",
      priorExperience: data.priorExperience?.trim() || "First-time volunteer",
      motivation: data.motivation.trim(),
      skills: data.skills?.trim() || "",
      tshirtSize: data.tshirtSize || "L",
      acceptedCodeOfConduct: Boolean(data.acceptedCodeOfConduct),
    };

    let savedToFirebase = false;

    // 1. Save to Firestore in collection "volunteer_submissions"
    try {
      const docRef = doc(db, "volunteer_submissions", submissionId);
      await setDoc(docRef, {
        ...submission,
        serverTimestamp: serverTimestamp(),
      });
      savedToFirebase = true;
      console.log(`[Firebase] Successfully saved Volunteer submission ${submissionId} to Firestore.`);
    } catch (fbError) {
      console.error("[Firebase] Error saving volunteer to Firestore:", fbError);
    }

    // 2. Local Backup in data/volunteer_submissions.json
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "volunteer_submissions.json");
      let submissions: VolunteerSubmission[] = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(fileContent);
      }
      submissions.push({ ...submission, savedToFirebase });
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
    } catch (fsError) {
      console.warn("Could not write volunteer to local backup file:", fsError);
    }

    return NextResponse.json(
      {
        success: true,
        id: submissionId,
        message: "Your volunteer application has been submitted to GDG Cloud Bengaluru!",
        timestamp: submission.createdAt,
        savedToFirebase,
        summary: {
          fullName: submission.fullName,
          email: submission.email,
          role: submission.primaryRole,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error processing volunteer submission:", err);
    return NextResponse.json(
      { error: "Internal server error processing volunteer application. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    event: "GDG Cloud Bengaluru Volunteer Intake 2026",
    collection: "volunteer_submissions",
    roles: [
      "Event Operations & Stage Management",
      "Registration & Attendee Desk",
      "Design, Creatives & Social Media",
      "Tech Support, AV & Live Streaming",
      "Speaker Concierge & Logistics",
      "Photography & Video Coverage",
    ],
  });
}
