"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";

interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  status: string;
  organization: string;
  city: string;
  headshotUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterHandle: string;
  portfolioUrl: string;
  primaryRole: string;
  secondaryRoles: string[];
  availability: string;
  priorExperience: string;
  motivation: string;
  skills: string;
  tshirtSize: string;
  acceptedCodeOfConduct: boolean;
}

const initialVolunteerData: VolunteerFormData = {
  fullName: "",
  email: "",
  phone: "",
  status: "",
  organization: "",
  city: "",
  headshotUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  twitterHandle: "",
  portfolioUrl: "",
  primaryRole: "",
  secondaryRoles: [],
  availability: "",
  priorExperience: "",
  motivation: "",
  skills: "",
  tshirtSize: "",
  acceptedCodeOfConduct: false,
};

const volunteerRoles = [
  { id: "Event Operations & Stage Management", label: "Operations & Stage", desc: "Speaker mic coordination, stage timing, schedule flow, venue setup" },
  { id: "Registration & Attendee Desk", label: "Registration Desk", desc: "Check-in scanning, badge distribution, attendee welcome, helpdesk" },
  { id: "Design, Creatives & Social Media", label: "Design & Socials", desc: "Live event tweeting, stories, photo editing, graphics, recap posts" },
  { id: "Tech Support, AV & Live Streaming", label: "Tech & AV Support", desc: "Projector testing, HDMI cables, audio soundcheck, live stream monitoring" },
  { id: "Speaker Concierge & Logistics", label: "Speaker Concierge", desc: "Welcoming VIP speakers, slide checks, green room hosting" },
  { id: "Photography & Video Coverage", label: "Photography & Video", desc: "Capturing stage moments, audience reactions, crowd group photos" },
];

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>(initialVolunteerData);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    setFormData((prev) => ({ ...prev, phone: e.target.value }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
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
      setPhotoPreview(result);
      setFormData((prev) => ({ ...prev, headshotUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview("");
    setFormData((prev) => ({ ...prev, headshotUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validations
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // 10 digits phone number validation
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const isValid10DigitPhone =
      phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
    if (!isValid10DigitPhone) {
      setErrorMessage("Mobile number is mandatory and must contain exactly 10 digits.");
      return;
    }

    if (!formData.status.trim()) {
      setErrorMessage("Please select your current status.");
      return;
    }

    if (!formData.organization.trim()) {
      setErrorMessage("Please provide your college, company, or organization.");
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }

    if (!formData.primaryRole.trim()) {
      setErrorMessage("Please select your primary volunteer area of interest.");
      return;
    }

    if (!formData.headshotUrl.trim() && !photoPreview) {
      setErrorMessage("Profile photo is mandatory. Please upload an image.");
      return;
    }

    if (!formData.linkedinUrl.trim()) {
      setErrorMessage("LinkedIn profile URL is mandatory.");
      return;
    }

    if (!formData.motivation.trim() || formData.motivation.trim().length < 15) {
      setErrorMessage("Please share why you want to volunteer (minimum 15 characters).");
      return;
    }

    if (!formData.acceptedCodeOfConduct) {
      setErrorMessage("Please accept the Code of Conduct to submit your volunteer application.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit volunteer application.");
      }

      setSubmittedId(data.id);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
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
          <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Application Received!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you, <span className="font-semibold text-black">{formData.fullName}</span>. Your application to join the GDG Cloud Bengaluru volunteer crew has been submitted.
        </p>

        {/* Reference Box */}
        <div className="mt-8 border border-black rounded-xl p-5 bg-white text-left flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Volunteer Reference ID</span>
            <p className="font-mono text-base font-bold text-black mt-0.5">{submittedId}</p>
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
          <div><span className="font-semibold text-black">Primary Role:</span> {formData.primaryRole}</div>
          <div><span className="font-semibold text-black">Organization:</span> {formData.organization} ({formData.status})</div>
          <div><span className="font-semibold text-black">Contact:</span> {formData.email} &bull; {formData.phone}</div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setFormData(initialVolunteerData);
              setPhotoPreview("");
            }}
            className="border border-black rounded-full px-6 py-2.5 text-xs font-semibold text-black bg-white hover:bg-gray-100 transition"
          >
            Submit Another Application
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

  // CLEAN PROFESSIONAL VOLUNTEER FORM (White Fill, Black Stroke)
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl bg-white border border-black rounded-2xl p-6 sm:p-12 shadow-none"
    >
      {/* Error alert */}
      {errorMessage && (
        <div className="mb-8 border border-black bg-white p-4 rounded-xl text-xs font-medium text-black">
          <p className="font-bold uppercase tracking-wider mb-1">Please correct the following:</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* SECTION 1: PERSONAL INFORMATION */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          1. Volunteer Profile
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Tell us about yourself so we can reach out for upcoming meetups and flagship events.
        </p>

        {/* Profile Photo (Mandatory) */}
        <div className="mt-6 border border-black rounded-xl p-5 bg-white">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Profile Photo <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] font-semibold text-black">Mandatory</span>
          </div>
          <p className="mt-0.5 text-xs text-gray-600">
            Clear portrait photo for volunteer badge accreditation. Max 5MB (PNG, JPG, WebP).
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className={`relative h-20 w-20 shrink-0 rounded-xl border ${photoPreview ? "border-black" : "border-dashed border-black"} bg-white overflow-hidden flex items-center justify-center`}>
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <svg className="h-6 w-6 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block mt-1">Required</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="volunteer-photo-file"
                />
                <label
                  htmlFor="volunteer-photo-file"
                  className="cursor-pointer border border-black rounded-lg px-3.5 py-1.5 text-xs font-semibold text-black bg-white hover:bg-black hover:text-white transition"
                >
                  {photoPreview ? "Replace Photo" : "Upload Photo"}
                </label>

                {photoPreview && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="border border-black rounded-lg px-3 py-1.5 text-xs font-semibold text-black bg-white hover:bg-gray-100 transition"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500">Or URL:</span>
                <input
                  type="url"
                  name="headshotUrl"
                  value={formData.headshotUrl.startsWith("data:") ? "" : formData.headshotUrl}
                  onChange={(e) => {
                    handleChange(e);
                    setPhotoPreview(e.target.value);
                  }}
                  placeholder="https://example.com/my-photo.jpg"
                  className="flex-1 border border-black rounded-lg px-3 py-1 text-xs text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details Grid */}
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
              placeholder="e.g. Rahul Verma"
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
              placeholder="rahul@example.com"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* 10-Digits Phone Number */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black">
                Mobile Number (10 Digits) <span className="text-red-500">*</span>
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
              Current Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Student">Student</option>
              <option value="Freelancer / Consultant">Freelancer / Consultant</option>
              <option value="Looking for Opportunities">Looking for Opportunities</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              College / Company / Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. BMS College / Infosys / Independent"
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
              placeholder="e.g. Bengaluru"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              T-Shirt Size (For Crew Swag)
            </label>
            <select
              name="tshirtSize"
              value={formData.tshirtSize}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Size (Optional)</option>
              <option value="S">S (Small)</option>
              <option value="M">M (Medium)</option>
              <option value="L">L (Large)</option>
              <option value="XL">XL (Extra Large)</option>
              <option value="2XL">2XL (Double Extra Large)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: SOCIAL MEDIA */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          2. Social Media & Profiles
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Share your professional profiles and social footprint.
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
              GitHub / GitLab
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

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Portfolio / Website / Previous Event Work <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              placeholder="https://yourportfolio.dev or drive link"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: VOLUNTEER PREFERENCES & MOTIVATION */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          3. Volunteer Roles & Superpowers
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Where would you like to contribute your time and energy?
        </p>

        {/* Primary Role Selector */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
            Primary Area of Interest <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {volunteerRoles.map((r) => {
              const isSelected = formData.primaryRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, primaryRole: r.id }))}
                  className={`text-left border border-black rounded-xl p-3.5 transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{r.label}</span>
                    <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-white" : "border border-black"}`} />
                  </div>
                  <p className={`mt-1 text-[11px] leading-snug ${isSelected ? "text-gray-300" : "text-gray-600"}`}>
                    {r.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Availability (Optional)</option>
              <option value="Full-day offline weekend events">Full-day offline weekend events (Saturdays/Sundays)</option>
              <option value="Half-day meetups">Half-day meetups (Afternoons)</option>
              <option value="Online / Remote coordination (Weekdays)">Online / Remote coordination (Weekdays)</option>
              <option value="Both offline and online">Both offline and online as needed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Prior Community / Event Volunteering Experience
            </label>
            <input
              type="text"
              name="priorExperience"
              value={formData.priorExperience}
              onChange={handleChange}
              placeholder="e.g. Volunteered at GDSC, college tech fest lead, or First-time volunteer"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black">
                Why do you want to volunteer with GDG Cloud Bengaluru? <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-gray-500">{formData.motivation.length} characters</span>
            </div>
            <textarea
              name="motivation"
              rows={3}
              required
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Share what drives you to contribute, what you want to learn, and how you want to support the community..."
              className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Special Skills / Superpowers <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Photography with DSLR, Figma poster design, Emceeing/hosting, video editing"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>
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
            I agree to uphold the{" "}
            <Link href="/code-of-conduct" target="_blank" className="font-bold text-black underline">
              GDG Cloud Bengaluru Code of Conduct
            </Link>
            . I commit to being reliable, collaborative, and representing the community with enthusiasm and integrity.
          </span>
        </label>

        <div className="mt-8">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto border border-black rounded-full px-10 py-3.5 text-sm font-bold text-white bg-black hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {submitting ? "Submitting Application..." : "Submit Volunteer Application"}
          </button>
        </div>
      </div>
    </form>
  );
}
