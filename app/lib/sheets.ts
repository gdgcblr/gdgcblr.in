import Papa from "papaparse";

export type EventData = {
  title: string;
  description: string;
  date: string;
  venue: string;
  format: string;
  link: string;
  isUpcoming: boolean;
  isFeatured: boolean;
  color: string;
  tag: string;
  meta: string;
};

export async function getEventsData(csvUrl?: string): Promise<EventData[]> {
  // Use environment variable if URL is not explicitly passed
  const url = csvUrl || process.env.GOOGLE_SHEETS_EVENTS_URL;

  if (!url) {
    console.warn("No Google Sheets CSV URL provided. Using fallback data.");
    return getFallbackData();
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Google Sheet CSV: ${res.statusText}`);
    }

    const csvText = await res.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const events: EventData[] = results.data.map((row: any) => ({
            title: row.Title || "",
            description: row.Description || "",
            date: row.Date || "",
            venue: row.Venue || "",
            format: row.Format || "",
            link: row.Link || "",
            isUpcoming: String(row.IsUpcoming).trim().toLowerCase() === "true",
            isFeatured: String(row.IsFeatured).trim().toLowerCase() === "true",
            color: row.Color || "#000000",
            tag: row.Tag || "",
            meta: row.Meta || "",
          }));
          resolve(events);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return getFallbackData();
  }
}

// Fallback data so the site doesn't break if the sheet URL is missing or fails
function getFallbackData(): EventData[] {
  return [
    {
      title: "DeployFest 2026",
      description:
        "A single-day, intensive buildathon focused on shipping working deployments, solving real problems, and sharing live demos.",
      date: "May 23, 2026",
      venue: "Deutsche Bank",
      format: "Buildathon",
      link: "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/",
      isUpcoming: false,
      isFeatured: true,
      color: "#EA4335",
      tag: "Flagship",
      meta: "Bengaluru · GCP, IaC",
    },
    {
      title: "Come for Cloud, Stay for Success",
      description: "Community meetup",
      date: "23/05/2026",
      venue: "Postman Bengaluru",
      format: "Meetup",
      link: "#",
      isUpcoming: false,
      isFeatured: false,
      color: "#4285F4",
      tag: "23/05/2026",
      meta: "Postman Bengaluru · GCP, IaC, DevOps",
    },
    {
      title: "Cloudtoberfest 2025",
      description: "Annual Cloud Festival",
      date: "23/05/2026",
      venue: "Bagmane Capital Park",
      format: "Festival",
      link: "#",
      isUpcoming: false,
      isFeatured: false,
      color: "#EA4335",
      tag: "23/05/2026",
      meta: "Bagmane Capital Park · K8s, GKE, Istio",
    },
    {
      title: "Community Day Bengaluru 2025",
      description: "Flagship Community Day",
      date: "23/05/2026",
      venue: "Hilton Bengaluru Embassy Manyata",
      format: "Flagship",
      link: "#",
      isUpcoming: false,
      isFeatured: false,
      color: "#34A853",
      tag: "23/05/2026",
      meta: "Hilton Bengaluru Embassy Manyata",
    },
  ];
}
