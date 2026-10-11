"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CFPSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  city: string;
  country: string;
  bio: string;
  headshotUrl?: string;
  linkedinUrl: string;
  githubUrl?: string;
  twitterHandle?: string;
  websiteUrl?: string;
  previousTalkUrl?: string;
  format: "Talk" | "Workshop" | "Panel";
  track: string;
  level: string;
  title?: string;
  abstract?: string;
  takeaways?: string;
  prerequisites?: string;
  presentedBefore?: string;
  panelTopic?: string;
  panelPerspective?: string;
}

interface VolunteerSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  organization: string;
  city: string;
  headshotUrl?: string;
  linkedinUrl: string;
  githubUrl?: string;
  twitterHandle?: string;
  portfolioUrl?: string;
  primaryRole: string;
  availability: string;
  priorExperience: string;
  motivation: string;
  skills?: string;
  tshirtSize?: string;
}

interface VenueSubmission {
  id: string;
  createdAt: string;
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
  securityRequirements?: string;
  sponsorshipNotes?: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"cfp" | "volunteers" | "venues">("cfp");

  // Submissions State
  const [cfpSubmissions, setCfpSubmissions] = useState<CFPSubmission[]>([]);
  const [volunteerSubmissions, setVolunteerSubmissions] = useState<VolunteerSubmission[]>([]);
  const [venueSubmissions, setVenueSubmissions] = useState<VenueSubmission[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  // CFP Filters
  const [cfpSearch, setCfpSearch] = useState<string>("");
  const [formatFilter, setFormatFilter] = useState<string>("All");
  const [trackFilter, setTrackFilter] = useState<string>("All");

  // Volunteer Filters
  const [volSearch, setVolSearch] = useState<string>("");
  const [volRoleFilter, setVolRoleFilter] = useState<string>("All");

  // Venue Filters
  const [venueSearch, setVenueSearch] = useState<string>("");
  const [venueCapacityFilter, setVenueCapacityFilter] = useState<string>("All");

  // Modals
  const [selectedCfp, setSelectedCfp] = useState<CFPSubmission | null>(null);
  const [selectedVol, setSelectedVol] = useState<VolunteerSubmission | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueSubmission | null>(null);

  useEffect(() => {
    const savedPass = sessionStorage.getItem("cfp_admin_token");
    if (savedPass) {
      setPassword(savedPass);
      fetchAllData(savedPass);
    }
  }, []);

  const fetchAllData = async (passToUse: string) => {
    setLoading(true);
    setAuthError("");

    try {
      // 1. Fetch CFP submissions
      const cfpRes = await fetch("/api/admin/cfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passToUse }),
      });
      const cfpData = await cfpRes.json();

      if (!cfpRes.ok) {
        throw new Error(cfpData.error || "Authentication failed. Invalid password.");
      }

      setCfpSubmissions(cfpData.submissions || []);

      // 2. Fetch Volunteer submissions
      try {
        const volRes = await fetch("/api/admin/volunteer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: passToUse }),
        });
        const volData = await volRes.json();
        if (volRes.ok) {
          setVolunteerSubmissions(volData.volunteers || []);
        }
      } catch (volErr) {
        console.warn("Could not fetch volunteer data:", volErr);
      }

      // 3. Fetch Venue submissions
      try {
        const venueRes = await fetch("/api/admin/venue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: passToUse }),
        });
        const venueData = await venueRes.json();
        if (venueRes.ok) {
          setVenueSubmissions(venueData.venues || []);
        }
      } catch (venueErr) {
        console.warn("Could not fetch venue data:", venueErr);
      }

      setIsAuthenticated(true);
      sessionStorage.setItem("cfp_admin_token", passToUse);
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate.");
      setIsAuthenticated(false);
      sessionStorage.removeItem("cfp_admin_token");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Please enter the admin password.");
      return;
    }
    fetchAllData(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cfp_admin_token");
    setIsAuthenticated(false);
    setPassword("");
    setCfpSubmissions([]);
    setVolunteerSubmissions([]);
    setVenueSubmissions([]);
    setSelectedCfp(null);
    setSelectedVol(null);
    setSelectedVenue(null);
  };

  // Export CFP CSV
  const exportCfpCSV = () => {
    if (cfpSubmissions.length === 0) return;
    const headers = [
      "ID", "Created At", "Name", "Email", "Phone", "Role", "Company", "City",
      "Format", "Track", "Level", "Title / Panel Topic", "Abstract / Perspective",
      "Takeaways", "LinkedIn", "GitHub", "Twitter", "Website", "Previous Talk Link", "Bio"
    ];
    const rows = cfpSubmissions.map((s) => [
      s.id, s.createdAt,
      `"${(s.fullName || "").replace(/"/g, '""')}"`,
      `"${(s.email || "").replace(/"/g, '""')}"`,
      `"${(s.phone || "").replace(/"/g, '""')}"`,
      `"${(s.role || "").replace(/"/g, '""')}"`,
      `"${(s.company || "").replace(/"/g, '""')}"`,
      `"${(s.city || "").replace(/"/g, '""')}"`,
      s.format,
      `"${(s.track || "").replace(/"/g, '""')}"`,
      s.level,
      `"${(s.title || s.panelTopic || "").replace(/"/g, '""')}"`,
      `"${(s.abstract || s.panelPerspective || "").replace(/"/g, '""')}"`,
      `"${(s.takeaways || "").replace(/"/g, '""')}"`,
      `"${(s.linkedinUrl || "").replace(/"/g, '""')}"`,
      `"${(s.githubUrl || "").replace(/"/g, '""')}"`,
      `"${(s.twitterHandle || "").replace(/"/g, '""')}"`,
      `"${(s.websiteUrl || "").replace(/"/g, '""')}"`,
      `"${(s.previousTalkUrl || "").replace(/"/g, '""')}"`,
      `"${(s.bio || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `gdgcblr_cfp_submissions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Export Volunteer CSV
  const exportVolunteerCSV = () => {
    if (volunteerSubmissions.length === 0) return;
    const headers = [
      "ID", "Created At", "Name", "Email", "Phone", "Status", "Organization", "City",
      "Primary Role", "Availability", "Prior Experience", "Motivation", "Skills", "T-Shirt Size",
      "LinkedIn", "GitHub", "Twitter", "Portfolio"
    ];
    const rows = volunteerSubmissions.map((v) => [
      v.id, v.createdAt,
      `"${(v.fullName || "").replace(/"/g, '""')}"`,
      `"${(v.email || "").replace(/"/g, '""')}"`,
      `"${(v.phone || "").replace(/"/g, '""')}"`,
      `"${(v.status || "").replace(/"/g, '""')}"`,
      `"${(v.organization || "").replace(/"/g, '""')}"`,
      `"${(v.city || "").replace(/"/g, '""')}"`,
      `"${(v.primaryRole || "").replace(/"/g, '""')}"`,
      `"${(v.availability || "").replace(/"/g, '""')}"`,
      `"${(v.priorExperience || "").replace(/"/g, '""')}"`,
      `"${(v.motivation || "").replace(/"/g, '""')}"`,
      `"${(v.skills || "").replace(/"/g, '""')}"`,
      v.tshirtSize || "L",
      `"${(v.linkedinUrl || "").replace(/"/g, '""')}"`,
      `"${(v.githubUrl || "").replace(/"/g, '""')}"`,
      `"${(v.twitterHandle || "").replace(/"/g, '""')}"`,
      `"${(v.portfolioUrl || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `gdgcblr_volunteer_submissions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Export Venue CSV
  const exportVenueCSV = () => {
    if (venueSubmissions.length === 0) return;
    const headers = [
      "ID", "Created At", "Contact Name", "Email", "Phone", "Role", "Company",
      "Venue Name", "Location Area", "Capacity", "Venue Type", "Available Days",
      "Amenities", "Security Requirements", "Sponsorship Notes", "LinkedIn"
    ];
    const rows = venueSubmissions.map((vn) => [
      vn.id, vn.createdAt,
      `"${(vn.contactName || "").replace(/"/g, '""')}"`,
      `"${(vn.email || "").replace(/"/g, '""')}"`,
      `"${(vn.phone || "").replace(/"/g, '""')}"`,
      `"${(vn.role || "").replace(/"/g, '""')}"`,
      `"${(vn.company || "").replace(/"/g, '""')}"`,
      `"${(vn.venueName || "").replace(/"/g, '""')}"`,
      `"${(vn.locationArea || "").replace(/"/g, '""')}"`,
      `"${(vn.capacity || "").replace(/"/g, '""')}"`,
      `"${(vn.venueType || "").replace(/"/g, '""')}"`,
      `"${(vn.availableDays || "").replace(/"/g, '""')}"`,
      `"${(vn.amenities?.join("; ") || "").replace(/"/g, '""')}"`,
      `"${(vn.securityRequirements || "").replace(/"/g, '""')}"`,
      `"${(vn.sponsorshipNotes || "").replace(/"/g, '""')}"`,
      `"${(vn.linkedinUrl || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `gdgcblr_venue_submissions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Filtered lists
  const filteredCfp = cfpSubmissions.filter((s) => {
    const matchesFormat = formatFilter === "All" || s.format === formatFilter;
    const matchesTrack = trackFilter === "All" || s.track === trackFilter;
    const query = cfpSearch.toLowerCase();
    const matchesSearch =
      !query ||
      s.fullName?.toLowerCase().includes(query) ||
      s.company?.toLowerCase().includes(query) ||
      s.email?.toLowerCase().includes(query) ||
      s.title?.toLowerCase().includes(query) ||
      s.panelTopic?.toLowerCase().includes(query) ||
      s.id?.toLowerCase().includes(query);
    return matchesFormat && matchesTrack && matchesSearch;
  });

  const filteredVolunteers = volunteerSubmissions.filter((v) => {
    const matchesRole = volRoleFilter === "All" || v.primaryRole === volRoleFilter;
    const query = volSearch.toLowerCase();
    const matchesSearch =
      !query ||
      v.fullName?.toLowerCase().includes(query) ||
      v.organization?.toLowerCase().includes(query) ||
      v.email?.toLowerCase().includes(query) ||
      v.id?.toLowerCase().includes(query);
    return matchesRole && matchesSearch;
  });

  const filteredVenues = venueSubmissions.filter((vn) => {
    const matchesCapacity = venueCapacityFilter === "All" || vn.capacity === venueCapacityFilter;
    const query = venueSearch.toLowerCase();
    const matchesSearch =
      !query ||
      vn.contactName?.toLowerCase().includes(query) ||
      vn.company?.toLowerCase().includes(query) ||
      vn.venueName?.toLowerCase().includes(query) ||
      vn.locationArea?.toLowerCase().includes(query) ||
      vn.email?.toLowerCase().includes(query) ||
      vn.id?.toLowerCase().includes(query);
    return matchesCapacity && matchesSearch;
  });

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-5">
        <div className="w-full max-w-md border border-black rounded-2xl p-8 bg-white text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-black bg-white mb-5">
            <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-black">
            GDG Admin Portal
          </h1>
          <p className="mt-1 text-xs text-gray-600">
            Enter password to view CFP proposals, Volunteer applications, and Venue partner offers.
          </p>

          {authError && (
            <div className="mt-4 border border-black p-3 rounded-lg text-xs font-semibold text-black bg-gray-50 text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="mt-1.5 block w-full border border-black rounded-lg px-3.5 py-2.5 text-sm text-black bg-white focus:outline-none placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-black rounded-full py-3 text-sm font-bold text-white bg-black hover:bg-neutral-800 transition disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Admin Console"}
            </button>
          </form>

          <p className="mt-6 text-[11px] text-gray-500">
            Default password: <code className="font-mono font-bold text-black bg-gray-100 px-1.5 py-0.5 rounded">gdgcblr@2026</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW (White Fill, Black Stroke)
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-black bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="border border-black rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white">
              Admin
            </span>
            <span className="font-bold text-sm text-black hidden sm:inline">
              GDG Cloud Bengaluru Community Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAllData(password)}
              disabled={loading}
              className="border border-black rounded-full px-4 py-1.5 text-xs font-semibold bg-white text-black hover:bg-gray-100 transition"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={activeTab === "cfp" ? exportCfpCSV : activeTab === "volunteers" ? exportVolunteerCSV : exportVenueCSV}
              className="border border-black rounded-full px-4 py-1.5 text-xs font-semibold bg-white text-black hover:bg-black hover:text-white transition"
            >
              Export {activeTab === "cfp" ? "CFP CSV" : activeTab === "volunteers" ? "Volunteer CSV" : "Venue CSV"}
            </button>
            <button
              onClick={handleLogout}
              className="border border-black rounded-full px-4 py-1.5 text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
        {/* Top Navigation Tabs */}
        <div className="flex border-b border-black mb-8 gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("cfp")}
            className={`border-t border-l border-r border-black rounded-t-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "cfp"
                ? "bg-black text-white -mb-px"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            CFP Proposals ({cfpSubmissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("volunteers")}
            className={`border-t border-l border-r border-black rounded-t-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "volunteers"
                ? "bg-black text-white -mb-px"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Volunteers ({volunteerSubmissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("venues")}
            className={`border-t border-l border-r border-black rounded-t-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "venues"
                ? "bg-black text-white -mb-px"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Venue Partners ({venueSubmissions.length})
          </button>
        </div>

        {/* ================= TAB 1: CFP PROPOSALS ================= */}
        {activeTab === "cfp" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total Proposals</span>
                <p className="mt-2 text-3xl font-extrabold text-black">{cfpSubmissions.length}</p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Talks</span>
                <p className="mt-2 text-3xl font-extrabold text-black">{cfpSubmissions.filter((s) => s.format === "Talk").length}</p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Workshops</span>
                <p className="mt-2 text-3xl font-extrabold text-black">{cfpSubmissions.filter((s) => s.format === "Workshop").length}</p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Panels</span>
                <p className="mt-2 text-3xl font-extrabold text-black">{cfpSubmissions.filter((s) => s.format === "Panel").length}</p>
              </div>
            </div>

            <div className="border border-black rounded-xl p-4 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  value={cfpSearch}
                  onChange={(e) => setCfpSearch(e.target.value)}
                  placeholder="Search speaker, company, title..."
                  className="w-full border border-black rounded-lg px-3.5 py-2 text-xs text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-gray-600">Format:</span>
                  <select
                    value={formatFilter}
                    onChange={(e) => setFormatFilter(e.target.value)}
                    className="border border-black rounded-lg px-2.5 py-1.5 text-xs text-black bg-white focus:outline-none"
                  >
                    <option value="All">All Formats</option>
                    <option value="Talk">Talk</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Panel">Panel</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-gray-600">Track:</span>
                  <select
                    value={trackFilter}
                    onChange={(e) => setTrackFilter(e.target.value)}
                    className="border border-black rounded-lg px-2.5 py-1.5 text-xs text-black bg-white focus:outline-none"
                  >
                    <option value="All">All Tracks</option>
                    <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                    <option value="Google Cloud Platform & Infra">GCP & Infra</option>
                    <option value="Kubernetes & Platform Engineering">Kubernetes & Platform</option>
                    <option value="Modern Data Stack & Analytics">Data Stack & Analytics</option>
                    <option value="App Modernization & Serverless">Serverless & App Mod</option>
                    <option value="DevSecOps & Cloud Security">DevSecOps & Security</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border border-black rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-black">
                      <th className="py-3.5 px-4">Speaker</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Format & Track</th>
                      <th className="py-3.5 px-4">Title / Panel Topic</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/15">
                    {filteredCfp.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500">
                          No CFP proposals found.
                        </td>
                      </tr>
                    ) : (
                      filteredCfp.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50 transition">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 shrink-0 rounded-lg border border-black overflow-hidden bg-gray-100 flex items-center justify-center">
                                {s.headshotUrl ? (
                                  <img src={s.headshotUrl} alt={s.fullName} className="h-full w-full object-cover" />
                                ) : (
                                  <span className="font-bold text-gray-500">{s.fullName?.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-black">{s.fullName}</p>
                                <p className="text-[11px] text-gray-600 line-clamp-1">{s.role} &bull; {s.company}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <p className="text-black">{s.email}</p>
                            <p className="text-gray-600">{s.phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block border border-black rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-black mb-1">
                              {s.format}
                            </span>
                            <p className="text-[11px] text-gray-600 line-clamp-1">{s.track}</p>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="font-semibold text-black line-clamp-2">
                              {s.format === "Panel" ? s.panelTopic : s.title}
                            </p>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                            {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedCfp(s)}
                              className="border border-black rounded-lg px-3 py-1.5 font-semibold text-xs text-black bg-white hover:bg-black hover:text-white transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: VOLUNTEER APPLICATIONS ================= */}
        {activeTab === "volunteers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total Volunteers</span>
                <p className="mt-2 text-3xl font-extrabold text-black">{volunteerSubmissions.length}</p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Operations & Stage</span>
                <p className="mt-2 text-3xl font-extrabold text-black">
                  {volunteerSubmissions.filter((v) => v.primaryRole.includes("Operations")).length}
                </p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Registration Desk</span>
                <p className="mt-2 text-3xl font-extrabold text-black">
                  {volunteerSubmissions.filter((v) => v.primaryRole.includes("Registration")).length}
                </p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tech, AV & Media</span>
                <p className="mt-2 text-3xl font-extrabold text-black">
                  {volunteerSubmissions.filter((v) => v.primaryRole.includes("Tech") || v.primaryRole.includes("Photography")).length}
                </p>
              </div>
            </div>

            <div className="border border-black rounded-xl p-4 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  value={volSearch}
                  onChange={(e) => setVolSearch(e.target.value)}
                  placeholder="Search name, organization, email..."
                  className="w-full border border-black rounded-lg px-3.5 py-2 text-xs text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                <span className="font-bold text-gray-600">Role:</span>
                <select
                  value={volRoleFilter}
                  onChange={(e) => setVolRoleFilter(e.target.value)}
                  className="border border-black rounded-lg px-2.5 py-1.5 text-xs text-black bg-white focus:outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Event Operations & Stage Management">Operations & Stage</option>
                  <option value="Registration & Attendee Desk">Registration Desk</option>
                  <option value="Design, Creatives & Social Media">Design & Socials</option>
                  <option value="Tech Support, AV & Live Streaming">Tech Support & AV</option>
                  <option value="Speaker Concierge & Logistics">Speaker Concierge</option>
                  <option value="Photography & Video Coverage">Photography & Video</option>
                </select>
              </div>
            </div>

            <div className="border border-black rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-black">
                      <th className="py-3.5 px-4">Volunteer</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Organization & Status</th>
                      <th className="py-3.5 px-4">Role Preference</th>
                      <th className="py-3.5 px-4">Applied</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/15">
                    {filteredVolunteers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500">
                          No volunteer applications found.
                        </td>
                      </tr>
                    ) : (
                      filteredVolunteers.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50 transition">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 shrink-0 rounded-lg border border-black overflow-hidden bg-gray-100 flex items-center justify-center">
                                {v.headshotUrl ? (
                                  <img src={v.headshotUrl} alt={v.fullName} className="h-full w-full object-cover" />
                                ) : (
                                  <span className="font-bold text-gray-500">{v.fullName?.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-black">{v.fullName}</p>
                                <p className="text-[11px] text-gray-600 line-clamp-1">{v.city}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <p className="text-black">{v.email}</p>
                            <p className="text-gray-600">{v.phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-black line-clamp-1">{v.organization}</p>
                            <p className="text-[11px] text-gray-500">{v.status}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block border border-black rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-black">
                              {v.primaryRole}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                            {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedVol(v)}
                              className="border border-black rounded-lg px-3 py-1.5 font-semibold text-xs text-black bg-white hover:bg-black hover:text-white transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: VENUE PARTNERS ================= */}
        {activeTab === "venues" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total Venue Offers</span>
                <p className="mt-2 text-3xl font-extrabold text-black">{venueSubmissions.length}</p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">100 - 200 Cap</span>
                <p className="mt-2 text-3xl font-extrabold text-black">
                  {venueSubmissions.filter((vn) => vn.capacity.includes("100 - 200")).length}
                </p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">200+ Large Halls</span>
                <p className="mt-2 text-3xl font-extrabold text-black">
                  {venueSubmissions.filter((vn) => vn.capacity.includes("200") || vn.capacity.includes("400")).length}
                </p>
              </div>
              <div className="border border-black rounded-xl p-5 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tech Campuses</span>
                <p className="mt-2 text-3xl font-extrabold text-black">
                  {venueSubmissions.filter((vn) => vn.venueType.includes("Corporate")).length}
                </p>
              </div>
            </div>

            <div className="border border-black rounded-xl p-4 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  value={venueSearch}
                  onChange={(e) => setVenueSearch(e.target.value)}
                  placeholder="Search company, area, contact person..."
                  className="w-full border border-black rounded-lg px-3.5 py-2 text-xs text-black bg-white focus:outline-none placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                <span className="font-bold text-gray-600">Capacity:</span>
                <select
                  value={venueCapacityFilter}
                  onChange={(e) => setVenueCapacityFilter(e.target.value)}
                  className="border border-black rounded-lg px-2.5 py-1.5 text-xs text-black bg-white focus:outline-none"
                >
                  <option value="All">All Capacities</option>
                  <option value="50 - 100 Attendees">50 - 100 Attendees</option>
                  <option value="100 - 200 Attendees">100 - 200 Attendees</option>
                  <option value="200 - 400 Attendees">200 - 400 Attendees</option>
                  <option value="400+ Flagship Auditorium">400+ Flagship Auditorium</option>
                </select>
              </div>
            </div>

            <div className="border border-black rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-black">
                      <th className="py-3.5 px-4">Company / Host</th>
                      <th className="py-3.5 px-4">Contact Person</th>
                      <th className="py-3.5 px-4">Location & Area</th>
                      <th className="py-3.5 px-4">Capacity & Type</th>
                      <th className="py-3.5 px-4">Date Offered</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/15">
                    {filteredVenues.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500">
                          No venue partner offers found.
                        </td>
                      </tr>
                    ) : (
                      filteredVenues.map((vn) => (
                        <tr key={vn.id} className="hover:bg-gray-50 transition">
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-black">{vn.company}</p>
                            <p className="text-[11px] text-gray-600 line-clamp-1">{vn.venueName}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-black">{vn.contactName}</p>
                            <p className="font-mono text-[11px] text-gray-600">{vn.email} &bull; {vn.phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-black">{vn.locationArea}</p>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{vn.fullAddress || "Bengaluru"}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block border border-black rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-black mb-1">
                              {vn.capacity}
                            </span>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{vn.venueType}</p>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                            {vn.createdAt ? new Date(vn.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedVenue(vn)}
                              className="border border-black rounded-lg px-3 py-1.5 font-semibold text-xs text-black bg-white hover:bg-black hover:text-white transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: CFP DETAILS */}
      {selectedCfp && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-black rounded-2xl bg-white p-6 sm:p-8 text-black">
            <div className="flex items-start justify-between border-b border-black/20 pb-4">
              <div>
                <span className="border border-black rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white mr-2">
                  {selectedCfp.format}
                </span>
                <span className="text-xs font-mono text-gray-500 font-semibold">{selectedCfp.id}</span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-black">
                  {selectedCfp.format === "Panel" ? selectedCfp.panelTopic : selectedCfp.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCfp(null)}
                className="border border-black rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-gray-100"
              >
                &times; Close
              </button>
            </div>

            <div className="mt-6 space-y-5 text-xs">
              <div className="border border-black rounded-xl p-4 bg-white flex flex-col sm:flex-row items-center gap-5">
                <div className="h-20 w-20 shrink-0 rounded-xl border border-black overflow-hidden bg-gray-100">
                  {selectedCfp.headshotUrl && (
                    <img src={selectedCfp.headshotUrl} alt={selectedCfp.fullName} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-bold text-black">{selectedCfp.fullName}</h4>
                  <p className="font-semibold text-gray-700">{selectedCfp.role} @ {selectedCfp.company}</p>
                  <p className="text-gray-500">{selectedCfp.city}, {selectedCfp.country}</p>
                  <p className="font-mono text-black">{selectedCfp.email} &bull; {selectedCfp.phone}</p>
                </div>
              </div>

              <div>
                <span className="block font-bold uppercase tracking-wider text-black mb-1">Speaker Bio</span>
                <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedCfp.bio}
                </p>
              </div>

              <div>
                <span className="block font-bold uppercase tracking-wider text-black mb-2">Social & External Profiles</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCfp.linkedinUrl && (
                    <a href={selectedCfp.linkedinUrl} target="_blank" rel="noreferrer" className="border border-black rounded-lg px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white transition">
                      LinkedIn &rarr;
                    </a>
                  )}
                  {selectedCfp.githubUrl && (
                    <a href={selectedCfp.githubUrl} target="_blank" rel="noreferrer" className="border border-black rounded-lg px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white transition">
                      GitHub &rarr;
                    </a>
                  )}
                </div>
              </div>

              {selectedCfp.format === "Panel" ? (
                <div className="space-y-4 border-t border-black/20 pt-4">
                  <div>
                    <span className="block font-bold uppercase tracking-wider text-black mb-1">Panel Focus</span>
                    <p className="border border-black/20 rounded-xl p-3 bg-gray-50 font-semibold">{selectedCfp.panelTopic}</p>
                  </div>
                  <div>
                    <span className="block font-bold uppercase tracking-wider text-black mb-1">Perspective</span>
                    <p className="border border-black/20 rounded-xl p-3 bg-gray-50 whitespace-pre-line">{selectedCfp.panelPerspective}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 border-t border-black/20 pt-4">
                  <div>
                    <span className="block font-bold uppercase tracking-wider text-black mb-1">Abstract</span>
                    <p className="border border-black/20 rounded-xl p-3 bg-gray-50 whitespace-pre-line">{selectedCfp.abstract}</p>
                  </div>
                  <div>
                    <span className="block font-bold uppercase tracking-wider text-black mb-1">Takeaways</span>
                    <p className="border border-black/20 rounded-xl p-3 bg-gray-50 whitespace-pre-line">{selectedCfp.takeaways}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-black/20 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCfp(null)}
                className="border border-black rounded-full px-6 py-2 text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VOLUNTEER DETAILS */}
      {selectedVol && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-black rounded-2xl bg-white p-6 sm:p-8 text-black">
            <div className="flex items-start justify-between border-b border-black/20 pb-4">
              <div>
                <span className="border border-black rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white mr-2">
                  Volunteer
                </span>
                <span className="text-xs font-mono text-gray-500 font-semibold">{selectedVol.id}</span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-black">
                  {selectedVol.fullName} &bull; {selectedVol.primaryRole}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVol(null)}
                className="border border-black rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-gray-100"
              >
                &times; Close
              </button>
            </div>

            <div className="mt-6 space-y-5 text-xs">
              <div className="border border-black rounded-xl p-4 bg-white flex flex-col sm:flex-row items-center gap-5">
                <div className="h-20 w-20 shrink-0 rounded-xl border border-black overflow-hidden bg-gray-100">
                  {selectedVol.headshotUrl && (
                    <img src={selectedVol.headshotUrl} alt={selectedVol.fullName} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-bold text-black">{selectedVol.fullName}</h4>
                  <p className="font-semibold text-gray-700">{selectedVol.organization} ({selectedVol.status})</p>
                  <p className="text-gray-500">{selectedVol.city} &bull; T-Shirt Size: {selectedVol.tshirtSize || "L"}</p>
                  <p className="font-mono text-black">{selectedVol.email} &bull; {selectedVol.phone}</p>
                </div>
              </div>

              <div>
                <span className="block font-bold uppercase tracking-wider text-black mb-1">Motivation Statement</span>
                <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedVol.motivation}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Availability</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700">
                    {selectedVol.availability}
                  </p>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Prior Experience</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700">
                    {selectedVol.priorExperience}
                  </p>
                </div>
              </div>

              {selectedVol.skills && (
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Special Skills / Superpowers</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700">
                    {selectedVol.skills}
                  </p>
                </div>
              )}

              <div>
                <span className="block font-bold uppercase tracking-wider text-black mb-2">Profiles</span>
                <div className="flex flex-wrap gap-2">
                  {selectedVol.linkedinUrl && (
                    <a href={selectedVol.linkedinUrl} target="_blank" rel="noreferrer" className="border border-black rounded-lg px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white transition">
                      LinkedIn &rarr;
                    </a>
                  )}
                  {selectedVol.githubUrl && (
                    <a href={selectedVol.githubUrl} target="_blank" rel="noreferrer" className="border border-black rounded-lg px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white transition">
                      GitHub &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-black/20 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVol(null)}
                className="border border-black rounded-full px-6 py-2 text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VENUE DETAILS */}
      {selectedVenue && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-black rounded-2xl bg-white p-6 sm:p-8 text-black">
            <div className="flex items-start justify-between border-b border-black/20 pb-4">
              <div>
                <span className="border border-black rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white mr-2">
                  Venue Host
                </span>
                <span className="text-xs font-mono text-gray-500 font-semibold">{selectedVenue.id}</span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-black">
                  {selectedVenue.company} &bull; {selectedVenue.venueName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVenue(null)}
                className="border border-black rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-gray-100"
              >
                &times; Close
              </button>
            </div>

            <div className="mt-6 space-y-5 text-xs">
              <div className="border border-black rounded-xl p-4 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500">Point of Contact</span>
                  <h4 className="text-base font-bold text-black mt-0.5">{selectedVenue.contactName}</h4>
                  <p className="font-semibold text-gray-700">{selectedVenue.role} @ {selectedVenue.company}</p>
                  <p className="font-mono text-black mt-1">{selectedVenue.email} &bull; {selectedVenue.phone}</p>
                </div>
                {selectedVenue.linkedinUrl && (
                  <a href={selectedVenue.linkedinUrl} target="_blank" rel="noreferrer" className="border border-black rounded-lg px-3 py-1.5 text-xs font-semibold bg-white text-black hover:bg-black hover:text-white transition">
                    LinkedIn Profile &rarr;
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Capacity</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-white font-semibold">{selectedVenue.capacity}</p>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Venue Type</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-white font-semibold">{selectedVenue.venueType}</p>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Location Area</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-white">{selectedVenue.locationArea}</p>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Preferred Timing / Days</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-white">{selectedVenue.availableDays}</p>
                </div>
              </div>

              {selectedVenue.fullAddress && (
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Full Street Address</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700 whitespace-pre-line">
                    {selectedVenue.fullAddress}
                  </p>
                </div>
              )}

              <div>
                <span className="block font-bold uppercase tracking-wider text-black mb-2">Amenities Provided</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVenue.amenities && selectedVenue.amenities.length > 0 ? (
                    selectedVenue.amenities.map((am) => (
                      <span key={am} className="border border-black rounded-md px-2.5 py-1 text-[11px] font-semibold bg-gray-50">
                        {am}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Standard venue setup</span>
                  )}
                </div>
              </div>

              {selectedVenue.securityRequirements && (
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">Security / Guest Entry Policy</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700">
                    {selectedVenue.securityRequirements}
                  </p>
                </div>
              )}

              {selectedVenue.sponsorshipNotes && (
                <div>
                  <span className="block font-bold uppercase tracking-wider text-black mb-1">F&B / Sponsorship Offerings</span>
                  <p className="border border-black/20 rounded-xl p-3 bg-gray-50 text-gray-700 whitespace-pre-line">
                    {selectedVenue.sponsorshipNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-black/20 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVenue(null)}
                className="border border-black rounded-full px-6 py-2 text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
