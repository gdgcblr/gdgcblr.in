"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

interface VenueFormData {
  contactName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  linkedinUrl: string;
  venueName: string;
  locationArea: string;
  fullAddress: string;
  capacity: string;
  venueType: string;
  availableDays: string;
  amenities: string[];
  securityRequirements: string;
  sponsorshipNotes: string;
  acceptedCodeOfConduct: boolean;
}

const initialVenueData: VenueFormData = {
  contactName: "",
  email: "",
  phone: "",
  role: "",
  company: "",
  linkedinUrl: "",
  venueName: "",
  locationArea: "",
  fullAddress: "",
  capacity: "",
  venueType: "",
  availableDays: "",
  amenities: [],
  securityRequirements: "",
  sponsorshipNotes: "",
  acceptedCodeOfConduct: false,
};

const capacityOptions = [
  "50 - 100 Attendees",
  "100 - 200 Attendees",
  "200 - 400 Attendees",
  "400+ Flagship Auditorium",
];

const venueTypeOptions = [
  "Corporate Tech Office / Campus",
  "Co-working Space / Innovation Hub",
  "University / College Auditorium",
  "Conference Center / Event Hall",
];

const availableDayOptions = [
  "Saturdays (Full Day)",
  "Sundays (Full Day)",
  "Weekday Evenings (5:30 PM - 8:30 PM)",
  "Flexible / Available on request",
];

const amenityOptions = [
  "High-speed Wi-Fi",
  "Projector & Stage Screen",
  "Audio & Microphone Setup",
  "Visitor Car / Bike Parking",
  "Cafeteria / Food & Dining Space",
  "Dedicated Guest Registration Desk",
  "Air Conditioned Hall",
  "Live Streaming AV Setup",
];

export default function VenueForm() {
  const [formData, setFormData] = useState<VenueFormData>(initialVenueData);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

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

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validations
    if (!formData.contactName.trim()) {
      setErrorMessage("Please enter the contact person's full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please provide a valid work email address.");
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

    if (!formData.company.trim()) {
      setErrorMessage("Please provide your company or campus name.");
      return;
    }

    if (!formData.locationArea.trim()) {
      setErrorMessage("Please specify the city area or neighborhood (e.g., Bellandur, Whitefield).");
      return;
    }

    if (!formData.capacity.trim()) {
      setErrorMessage("Please select the auditorium or hall capacity.");
      return;
    }

    if (!formData.venueType.trim()) {
      setErrorMessage("Please select the venue type.");
      return;
    }

    if (!formData.linkedinUrl.trim()) {
      setErrorMessage("LinkedIn profile URL is mandatory.");
      return;
    }

    if (!formData.acceptedCodeOfConduct) {
      setErrorMessage("Please agree to the Community Guidelines and Code of Conduct.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit venue proposal.");
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Venue Proposal Received!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you, <span className="font-semibold text-black">{formData.contactName}</span> ({formData.company}). Our organizing team will coordinate a venue walk-through and dates with you.
        </p>

        {/* Reference Box */}
        <div className="mt-8 border border-black rounded-xl p-5 bg-white text-left flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Venue Partner Reference ID</span>
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
          <div><span className="font-semibold text-black">Company / Host:</span> {formData.company} ({formData.locationArea})</div>
          <div><span className="font-semibold text-black">Capacity:</span> {formData.capacity} &bull; {formData.venueType}</div>
          <div><span className="font-semibold text-black">Point of Contact:</span> {formData.contactName} ({formData.email} &bull; {formData.phone})</div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setFormData(initialVenueData);
            }}
            className="border border-black rounded-full px-6 py-2.5 text-xs font-semibold text-black bg-white hover:bg-gray-100 transition"
          >
            Submit Another Venue
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

  // CLEAN PROFESSIONAL VENUE FORM (White Fill, Black Stroke)
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

      {/* SECTION 1: POINT OF CONTACT */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          1. Point of Contact & Organization
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Details of the coordinator or workplace lead representing the host venue.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              required
              value={formData.contactName}
              onChange={handleChange}
              placeholder="e.g. Ananya Sen"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Work Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="ananya@company.com"
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
              Company / Campus / Host Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Deutsche Bank / Postman / Google"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Your Role / Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Workplace Experience Lead / Engineering Director"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

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
        </div>
      </div>

      {/* SECTION 2: VENUE LOCATION & CAPACITY */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          2. Venue Details & Capacity
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Location area, seating scale, and preferred event timings.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Venue / Building Name
            </label>
            <input
              type="text"
              name="venueName"
              value={formData.venueName}
              onChange={handleChange}
              placeholder="e.g. Bagmane Tech Park, Tower B"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              City Area / Neighborhood <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="locationArea"
              required
              value={formData.locationArea}
              onChange={handleChange}
              placeholder="e.g. Outer Ring Road, Bellandur / Indiranagar"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Auditorium / Hall Capacity <span className="text-red-500">*</span>
            </label>
            <select
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Capacity</option>
              {capacityOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Venue Type <span className="text-red-500">*</span>
            </label>
            <select
              name="venueType"
              value={formData.venueType}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Venue Type</option>
              {venueTypeOptions.map((vt) => (
                <option key={vt} value={vt}>{vt}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Preferred Available Days
            </label>
            <select
              name="availableDays"
              value={formData.availableDays}
              onChange={handleChange}
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none"
            >
              <option value="">Select Available Days (Optional)</option>
              {availableDayOptions.map((ad) => (
                <option key={ad} value={ad}>{ad}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Full Street Address <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="fullAddress"
              rows={2}
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="e.g. 7th Floor, Campus 4B, RMZ Ecoworld, Devarabeesanahalli, Bengaluru, Karnataka 560103"
              className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: AMENITIES & LOGISTICS */}
      <div className="mt-10 border-t border-black/20 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
          3. Amenities & Event Logistics
        </h2>
        <p className="mt-1 text-xs text-gray-600">
          Select what technical amenities and infrastructure your space can provide.
        </p>

        {/* Amenities Selection Chips */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-3">
            Available Infrastructure & Amenities
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {amenityOptions.map((amenity) => {
              const isSelected = formData.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`text-left border border-black rounded-xl p-3 flex items-center justify-between transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xs font-semibold">{amenity}</span>
                  <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-white" : "border border-black"}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Security & Guest Entry Requirements
            </label>
            <input
              type="text"
              name="securityRequirements"
              value={formData.securityRequirements}
              onChange={handleChange}
              placeholder="e.g. Govt ID required at building turnstiles, laptop serial scan, open walk-in"
              className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              Food & Beverage / Sponsorship Offerings <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="sponsorshipNotes"
              rows={3}
              value={formData.sponsorshipNotes}
              onChange={handleChange}
              placeholder="Can your organization sponsor snacks, tea/coffee, networking lunch, or cloud credits? Any other notes for the community leads..."
              className="mt-1.5 block w-full border border-black rounded-lg p-3 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
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
            I agree to the{" "}
            <Link href="/code-of-conduct" target="_blank" className="font-bold text-black underline">
              GDG Cloud Bengaluru Community Guidelines
            </Link>
            . I represent that our organization is open to welcoming the developer community and coordinating with the GDG team for event hosting.
          </span>
        </label>

        <div className="mt-8">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto border border-black rounded-full px-10 py-3.5 text-sm font-bold text-white bg-black hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {submitting ? "Submitting Venue Proposal..." : "Submit Venue Proposal"}
          </button>
        </div>
      </div>
    </form>
  );
}
