import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Praxis Amara | Internistische Hausarztpraxis Eidelstedt",
    template: "%s | Praxis Amara",
  },
  description:
    "Ihre internistische Hausarztpraxis in Hamburg-Eidelstedt. Facharzt für Innere Medizin mit umfassender Diagnostik und persönlicher Betreuung.",
  keywords: [
    "Hausarzt",
    "Internist",
    "Hamburg",
    "Eidelstedt",
    "Innere Medizin",
    "Hausarztpraxis",
    "Praxis Amara",
  ],
  authors: [{ name: "Praxis Amara" }],
  creator: "Praxis Amara",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://hausarzt-internist-eidelstedt.de",
    siteName: "Praxis Amara",
    title: "Praxis Amara | Internistische Hausarztpraxis Eidelstedt",
    description:
      "Ihre internistische Hausarztpraxis in Hamburg-Eidelstedt. Facharzt für Innere Medizin mit umfassender Diagnostik und persönlicher Betreuung.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
