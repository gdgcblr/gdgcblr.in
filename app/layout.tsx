import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDG Cloud Bengaluru",
  description:
    "A premium community landing page for GDG Cloud Bengaluru, focused on Google Cloud, GenAI, DevOps, Kubernetes, and developer programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
