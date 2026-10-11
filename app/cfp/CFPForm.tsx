"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";

type SessionFormat = "Talk" | "Workshop" | "Panel";

interface FormData {
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
  githubUrl: string;
  twitterHandle: string;
  websiteUrl: string;
  previousTalkUrl: string;
  // Session
  format: SessionFormat;
  track: string;
  level: string;
  // Dynamic fields for Talk & Workshop
  title: string;
  abstract: string;
  takeaways: string;
  prerequisites: string;
  presentedBefore: string;
  // Dynamic fields for Panel
  panelTopic: string;
  panelPerspective: string;
  // Consent
  acceptedCodeOfConduct: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  company: "",
  city: "",
  country: "",
  bio: "",
  headshotUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  twitterHandle: "",
  websiteUrl: "",
  previousTalkUrl: "",
  format: "Talk",
  track: "",
  level: "Intermediate",
  title: "",
  abstract: "",
  takeaways: "",
  prerequisites: "",
  presentedBefore: "",
  panelTopic: "",
  panelPerspective: "",
  acceptedCodeOfConduct: false,
};

const tracks = [
  "Generative AI & LLMs",
  "Google Cloud Platform & Infra",
  "Kubernetes & Platform Engineering",
  "Modern Data Stack & Analytics",
  "App Modernization & Serverless",
  "DevSecOps & Cloud Security",
];

const formats: { id: SessionFormat; label: string; desc: string }[] = [
  {
    id: "Talk",
    label: "Talk",
    desc: "Technical presentation on architecture, design patterns, or case studies.",
  },
  {
    id: "Workshop",
    label: "Workshop",
    desc: "Interactive guided coding session where attendees build live.",
  },
  {
    id: "Panel",
    label: "Panel",
    desc: "Participate as an industry practitioner or domain expert in a panel.",
  },
];

const levels = ["Beginner", "Intermediate", "Advanced / Deep Dive"];

export default function CFPForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [headshotPreview, setHeadshotPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers, spaces, plus, hyphens
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, phone: val }));
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is larger than 5MB. Please choose a smaller photo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setHeadshotPreview(result);
      setFormData((prev) => ({ ...prev, headshotUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const removeHeadshot = () => {
    setHeadshotPreview("");
    setFormData((prev) => ({ ...prev, headshotUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => {
      const errorEl = document.getElementById("cfp-submit-error");
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Validate Speaker Info
    if (!formData.fullName.trim()) {
      showError("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      showError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    // Mobile Number: Mandatory & strictly 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const isValid10DigitPhone =
      phoneDigits.length === 10 ||
      (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
    if (!isValid10DigitPhone) {
      showError("Mobile number is mandatory and must contain exactly 10 digits.");
      return;
    }

    if (!formData.role.trim() || !formData.company.trim()) {
      showError("Job role and company are mandatory.");
      return;
    }

    if (!formData.city.trim() || !formData.country.trim()) {
      showError("City and country are mandatory.");
      return;
    }

    // Headshot Image: Mandatory
    if (!formData.headshotUrl.trim() && !headshotPreview) {
      showError("Headshot image is mandatory. Please upload or link your photo in Section 1.");
      return;
    }

    if (!formData.bio.trim() || formData.bio.trim().length < 15) {
      showError("Speaker bio is mandatory (minimum 15 characters).");
      return;
    }

    // LinkedIn: Mandatory
    if (!formData.linkedinUrl.trim()) {
      showError("LinkedIn profile URL is mandatory.");
      return;
    }

    if (!formData.track.trim()) {
      showError("Please select a topic track in Section 3.");
      return;
    }

    if (!formData.level.trim()) {
      showError("Please select target audience level in Section 3.");
      return;
    }

    // 2. Validate Dynamic Session Format
    if (formData.format === "Panel") {
      if (!formData.panelTopic.trim() || formData.panelTopic.trim().length < 5) {
        showError("Please enter the panel topic or discussion theme (minimum 5 characters).");
        return;
      }
      if (
        !formData.panelPerspective.trim() ||
        formData.panelPerspective.trim().length < 15
      ) {
        showError(
          "Please describe the perspective and production experience you will bring to the panel (minimum 15 characters).",
        );
        return;
      }
    } else {
      // Talk or Workshop
      if (!formData.title.trim() || formData.title.trim().length < 5) {
        showError("Session title is mandatory (minimum 5 characters).");
        return;
      }
      if (!formData.abstract.trim() || formData.abstract.trim().length < 25) {
        showError("Session abstract is mandatory (minimum 25 characters).");
        return;
      }
      if (!formData.takeaways.trim() || formData.takeaways.trim().length < 10) {
        showError("Please list at least 2 key attendee takeaways (minimum 10 characters).");
        return;
      }
    }

    // Code of Conduct
    if (!formData.acceptedCodeOfConduct) {
      showError("Please review and accept the Code of Conduct checkbox below.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/cfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit proposal.");
      }

      setSubmittedId(data.id);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err: any) {
      showError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyId = () => {
    if (!submittedId) return;
    navigator.clipboard.writeText(submittedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SUCCESS CONFIRMATION
  if (submittedId) {
    return (
      <div className="mx-auto w-full max-w-2xl bg-white border border-black rounded-2xl p-8 sm:p-12 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-black bg-white mb-6">
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Proposal Submitted Successfully
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you,{" "}
          <span className="font-semibold text-black">{formData.fullName}</span>.
          Your {formData.format.toLowerCase()} proposal has been sent to the
          review committee.
        </p>

        {/* Reference Box */}
        <div className="mt-8 border border-black rounded-xl p-5 bg-white text-left flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Proposal Reference ID
            </span>
            <p className="font-mono text-base font-bold text-black mt-0.5">
              {submittedId}
            </p>
          </div>
          <button
            type="button"
            onClick={copyId}
            className="border border-black rounded-lg px-3.5 py-1.5 text-xs font-semibold bg-white text-black hover:bg-black hover:text-white transition"
          >
            {copied ? "Copied" : "Copy ID"}
          </button>
        </div>

        {/* Summary Info */}
        <div className="mt-6 border border-black/20 rounded-xl p-5 bg-white text-left text-xs space-y-2 text-gray-700">
          <div>
            <span className="font-semibold text-black">Format:</span>{" "}
            {formData.format} &bull; {formData.track}
          </div>
          {formData.format === "Panel" ? (
            <div>
              <span className="font-semibold text-black">Panel Topic:</span>{" "}
              {formData.panelTopic}
            </div>
          ) : (
            <div>
              <span className="font-semibold text-black">Session Title:</span>{" "}
              {formData.title}
            </div>
          )}
          <div>
            <span className="font-semibold text-black">Contact:</span>{" "}
            {formData.email} &bull; {formData.phone}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setFormData(initialFormData);
              setHeadshotPreview("");
            }}
            className="border border-black rounded-full px-6 py-2.5 text-xs font-semibold text-black bg-white hover:bg-gray-100 transition"
          >
            Submit Another Proposal
          </button>
          <Link
            href="/"
            className="border border-black rounded-full px-7 py-2.5 text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition"
          >
            Return to Home &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // CLEAN PROFESSIONAL FORM (White Fill, Black Stroke)
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-3xl bg-white border border-black rounded-2xl p-6 sm:p-12 shadow-none"
    >
      {/* Error alert */}
      {errorMessage && (
        <div className="mb-8 border border-black bg-white p-4 rounded-xl text-xs font-medium text-black">
          <p className="font-bold uppercase tracking-wider mb-1">
            Please correct the following:
          </p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* SECTION 1: SPEAKER INFORMATION */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          1. Speaker Information
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Your credentials and profile for the conference schedule.
        </p>

        {/* Headshot Upload (Mandatory) */}
        <div className="mt-6 border border-black rounded-xl p-5 bg-white">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Headshot Image <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] font-semibold text-black">
              Mandatory
            </span>
          </div>
          <p className="mt-0.5 text-xs text-gray-600">
            Upload a clear high-resolution portrait photo for the speaker
            roster. Max 5MB (PNG, JPG, WebP).
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className={`relative h-20 w-20 shrink-0 rounded-xl border ${headshotPreview ? "border-black" : "border-dashed border-black"} bg-white overflow-hidden flex items-center justify-center`}
            >
              {headshotPreview ? (
                <img
                  src={headshotPreview}
                  alt="Headshot preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <svg
                    className="h-6 w-6 text-gray-400 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block mt-1">
                    Required
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  id="headshot-file"
                />
                <label
                  htmlFor="headshot-file"
                  className="cursor-pointer border border-black rounded-lg px-3.5 py-1.5 text-xs font-semibold text-black bg-white hover:bg-black hover:text-white transition"
                >
                  {headshotPreview ? "Replace Photo" : "Upload Headshot Image"}
                </label>

                {headshotPreview && (
                  <button
                    type="button"
                    onClick={removeHeadshot}
                    className="border border-black rounded-lg px-3 py-1.5 text-xs font-semibold text-black bg-white hover:bg-gray-100 transition"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500">
                  Or public URL:
                </span>
                <input
                  type="url"
                  name="headshotUrl"
                  value={
                    formData.headshotUrl.startsWith("data:")
                      ? ""
                      : formData.headshotUrl
                  }
                  onChange={(e) => {
                    handleChange(e);
                    setHeadshotPreview(e.target.value);
                  }}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 border border-black rounded-lg px-3 py-1 text-xs text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Basic fields */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Aditi Rao"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Mandatory 10 Digits Phone Number */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black">
                Mobile Number (10 Digits){" "}
                <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-gray-500 font-mono">
                {formData.phone.replace(/\D/g, "").length} / 10 digits
              </span>
            </div>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength={15}
              placeholder="9876543210"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Job Title / Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Staff Platform Engineer"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Company / Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google / Razorpay / Independent"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="Bengaluru"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              placeholder="India"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black">
                Speaker Bio <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-gray-500">
                {formData.bio.length} characters
              </span>
            </div>
            <textarea
              name="bio"
              rows={3}
              required
              value={formData.bio}
              onChange={handleChange}
              placeholder="2-3 sentences about your engineering background, cloud expertise, or speaking experience..."
              className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: SOCIAL MEDIA */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          2. Social Media & Links
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Where attendees and organizers can review your work.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              LinkedIn Profile URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="linkedinUrl"
              required
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              GitHub / Portfolio
            </label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              X / Twitter
            </label>
            <input
              type="text"
              name="twitterHandle"
              value={formData.twitterHandle}
              onChange={handleChange}
              placeholder="@handle or URL"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Personal Website / Blog
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://yourdomain.dev"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Previous Talk Video / Slides{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              name="previousTalkUrl"
              value={formData.previousTalkUrl}
              onChange={handleChange}
              placeholder="YouTube, SpeakerDeck, or Sessionize link"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: SESSION PROPOSAL (FIRST ASK FORMAT, THEN SHOW DYNAMIC FIELDS) */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          3. Session Proposal
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          First choose your session format. The fields below will adapt
          dynamically.
        </p>

        {/* 1. FIRST: SESSION FORMAT SELECTOR */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
            Select Session Format <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {formats.map((f) => {
              const isSelected = formData.format === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, format: f.id }))
                  }
                  className={`text-left border border-black rounded-xl p-4 transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{f.label}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${isSelected ? "bg-white" : "border border-black"}`}
                    />
                  </div>
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isSelected ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {f.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. DYNAMIC FIELDS ACCORDING TO FORMAT */}
        <div className="mt-6 space-y-5">
          {/* PRIMARY TRACK (Needed for all formats) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Primary Technology Track <span className="text-red-500">*</span>
            </label>
            <select
              name="track"
              value={formData.track}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Topic Track</option>
              {tracks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* TARGET AUDIENCE LEVEL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Target Audience Level <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {levels.map((lvl) => {
                const isSelected = formData.level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, level: lvl }))
                    }
                    className={`border border-black rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      isSelected
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── CASE A: PANEL FORMAT (No solo session title or abstract needed) ── */}
          {formData.format === "Panel" ? (
            <div className="space-y-5 border-t border-black/15 pt-5">
              <div className="bg-gray-50 border border-black/20 rounded-xl p-4 text-xs text-gray-700">
                <span className="font-bold text-black block mb-0.5">
                  Panelist Application
                </span>
                For panel discussions, standalone session titles, slide
                abstracts, and individual takeaways are not required. Please
                tell us your focus topic and what technical perspectives you
                bring.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black">
                  Panel Topic / Discussion Theme{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="panelTopic"
                  required
                  value={formData.panelTopic}
                  onChange={handleChange}
                  placeholder="e.g. Navigating Multi-Agent Architectures & Real Production Failures"
                  className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black">
                  Your Perspective & Industry Experience{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="panelPerspective"
                  rows={4}
                  required
                  value={formData.panelPerspective}
                  onChange={handleChange}
                  placeholder="What specific lessons, architectural viewpoints, production war stories, or contrarian opinions will you contribute to the panel dialogue?"
                  className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>
          ) : (
            /* ── CASE B: TALK OR WORKSHOP FORMAT (Solo Session details required) ── */
            <div className="space-y-5 border-t border-black/15 pt-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black">
                  {formData.format} Title{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={
                    formData.format === "Workshop"
                      ? "e.g. Hands-on: Building Resilient Microservices with Cloud Run and Eventarc"
                      : "e.g. Scaling Autonomous Agents with Vertex AI and Cloud Run"
                  }
                  className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black">
                  {formData.format} Abstract / Description{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="abstract"
                  rows={4}
                  required
                  value={formData.abstract}
                  onChange={handleChange}
                  placeholder="Outline the core problem, key architectural insights, and live demonstration details..."
                  className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black">
                  Key Attendee Takeaways <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="takeaways"
                  rows={3}
                  required
                  value={formData.takeaways}
                  onChange={handleChange}
                  placeholder="List 2-3 actionable lessons attendees will learn..."
                  className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black">
                    Prerequisites / Tools{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleChange}
                    placeholder="e.g. Basic Docker knowledge, laptop with gcloud CLI"
                    className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black">
                    Presented Before?
                  </label>
                  <select
                    name="presentedBefore"
                    value={formData.presentedBefore}
                    onChange={handleChange}
                    className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
                  >
                    <option value="No - Brand new talk">
                      No - Brand new talk
                    </option>
                    <option value="Yes - Local meetup">
                      Yes - Local meetup
                    </option>
                    <option value="Yes - Major conference">
                      Yes - Major conference
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CODE OF CONDUCT & SUBMIT */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptedCodeOfConduct"
            required
            checked={formData.acceptedCodeOfConduct}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-black accent-black"
          />
          <span className="text-xs text-gray-700 leading-relaxed">
            I agree to follow the{" "}
            <Link
              href="/code-of-conduct"
              target="_blank"
              className="font-bold text-black underline"
            >
              GDG Cloud Bengaluru Code of Conduct
            </Link>
            . I confirm this submission is authentic work and consent to having
            the presentation recorded for community purposes.
          </span>
        </label>

        {/* Error banner directly above submit button */}
        {errorMessage && (
          <div
            id="cfp-submit-error"
            className="mt-6 border border-black bg-white p-4 rounded-xl text-xs font-semibold text-black"
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider mb-1 text-black">
              <svg
                className="h-4 w-4 shrink-0 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Action Required:
            </div>
            <p className="text-gray-800 font-normal">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto border border-black rounded-full px-10 py-3.5 text-sm font-bold text-white bg-black hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {submitting ? "Submitting Proposal..." : "Submit Proposal"}
          </button>
        </div>
      </div>
    </form>
  );
}
