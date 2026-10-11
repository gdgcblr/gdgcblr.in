import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export interface CFPSubmission {
  id: string;
  createdAt: string;
  // Speaker
  fullName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  city: string;
  country: string;
  bio: string;
  headshotUrl: string;
  // Socials
  linkedinUrl: string;
  githubUrl?: string;
  twitterHandle?: string;
  websiteUrl?: string;
  previousTalkUrl?: string;
  // Session
  format: "Talk" | "Workshop" | "Panel" | string;
  track: string;
  level: string;
  // Dynamic fields for Talk & Workshop
  title?: string;
  abstract?: string;
  takeaways?: string;
  prerequisites?: string;
  presentedBefore?: string;
  // Dynamic fields for Panel
  panelTopic?: string;
  panelPerspective?: string;
  // Consent
  acceptedCodeOfConduct: boolean;
  savedToFirebase?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const data: Partial<CFPSubmission> = await req.json();

    // 1. Mandatory Speaker Validation
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

    if (!data.role?.trim() || !data.company?.trim()) {
      return NextResponse.json({ error: "Job role and company are mandatory." }, { status: 400 });
    }

    if (!data.bio || data.bio.trim().length < 15) {
      return NextResponse.json({ error: "Speaker bio is mandatory (minimum 15 characters)." }, { status: 400 });
    }

    if (!data.headshotUrl || data.headshotUrl.trim().length === 0) {
      return NextResponse.json({ error: "Headshot image is mandatory. Please upload a photo." }, { status: 400 });
    }

    if (!data.linkedinUrl || data.linkedinUrl.trim().length < 4) {
      return NextResponse.json({ error: "LinkedIn profile URL is mandatory." }, { status: 400 });
    }

    if (!data.format || !["Talk", "Workshop", "Panel"].includes(data.format)) {
      return NextResponse.json({ error: "Please select a valid session format (Talk, Workshop, or Panel)." }, { status: 400 });
    }

    if (!data.track?.trim()) {
      return NextResponse.json({ error: "Please select a primary track/topic." }, { status: 400 });
    }

    // 2. Dynamic Format-Specific Validation
    if (data.format === "Panel") {
      if (!data.panelTopic || data.panelTopic.trim().length < 5) {
        return NextResponse.json({ error: "Please provide your panel topic or area of interest." }, { status: 400 });
      }
      if (!data.panelPerspective || data.panelPerspective.trim().length < 15) {
        return NextResponse.json({ error: "Please describe what perspective or experience you bring to the panel." }, { status: 400 });
      }
    } else {
      // Talk or Workshop
      if (!data.title || data.title.trim().length < 5) {
        return NextResponse.json({ error: "Session title is mandatory." }, { status: 400 });
      }
      if (!data.abstract || data.abstract.trim().length < 25) {
        return NextResponse.json({ error: "Session abstract is mandatory (minimum 25 characters)." }, { status: 400 });
      }
      if (!data.takeaways || data.takeaways.trim().length < 10) {
        return NextResponse.json({ error: "Key attendee takeaways are mandatory." }, { status: 400 });
      }
    }

    if (!data.acceptedCodeOfConduct) {
      return NextResponse.json({ error: "You must accept the Code of Conduct to submit." }, { status: 400 });
    }

    // Generate readable reference ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionId = `GDG-CFP-2026-${randomHex}`;

    const submission: CFPSubmission = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: rawPhone,
      role: data.role.trim(),
      company: data.company.trim(),
      city: data.city?.trim() || "Bengaluru",
      country: data.country?.trim() || "India",
      bio: data.bio.trim(),
      headshotUrl: data.headshotUrl,
      linkedinUrl: data.linkedinUrl.trim(),
      githubUrl: data.githubUrl?.trim() || "",
      twitterHandle: data.twitterHandle?.trim() || "",
      websiteUrl: data.websiteUrl?.trim() || "",
      previousTalkUrl: data.previousTalkUrl?.trim() || "",
      format: data.format,
      track: data.track.trim(),
      level: data.level?.trim() || "Intermediate",
      ...(data.format === "Panel"
        ? {
            title: `[Panel] ${data.panelTopic?.trim()}`,
            panelTopic: data.panelTopic?.trim(),
            panelPerspective: data.panelPerspective?.trim(),
          }
        : {
            title: data.title?.trim() || "",
            abstract: data.abstract?.trim() || "",
            takeaways: data.takeaways?.trim() || "",
            prerequisites: data.prerequisites?.trim() || "",
            presentedBefore: data.presentedBefore || "No - Brand new talk",
          }),
      acceptedCodeOfConduct: Boolean(data.acceptedCodeOfConduct),
    };

    let savedToFirebase = false;

    // 1. SAVE TO FIRESTORE DATABASE
    try {
      const docRef = doc(db, "cfp_submissions", submissionId);
      await setDoc(docRef, {
        ...submission,
        serverTimestamp: serverTimestamp(),
      });
      savedToFirebase = true;
      console.log(`[Firebase] Successfully saved CFP submission ${submissionId} to Firestore.`);
    } catch (fbError) {
      console.error("[Firebase] Error saving to Firestore:", fbError);
    }

    // 2. LOCAL BACKUP IN data/cfp_submissions.json
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "cfp_submissions.json");
      let submissions: CFPSubmission[] = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(fileContent);
      }
      submissions.push({ ...submission, savedToFirebase });
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
    } catch (fsError) {
      console.warn("Could not write submission to local backup file:", fsError);
    }

    return NextResponse.json(
      {
        success: true,
        id: submissionId,
        message: "Your proposal has been successfully submitted to GDG Cloud Bengaluru!",
        timestamp: submission.createdAt,
        savedToFirebase,
        summary: {
          fullName: submission.fullName,
          email: submission.email,
          title: submission.title || submission.panelTopic,
          track: submission.track,
          format: submission.format,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error processing CFP submission:", err);
    return NextResponse.json(
      { error: "Internal server error processing proposal. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    event: "GDG Cloud Bengaluru CFP 2026",
    collection: "cfp_submissions",
    formats: ["Talk", "Workshop", "Panel"],
    tracks: [
      "Generative AI & LLMs",
      "Google Cloud Platform & Infra",
      "Kubernetes & Platform Engineering",
      "Modern Data Stack & Analytics",
      "App Modernization & Serverless",
      "DevSecOps & Cloud Security",
    ],
  });
}
