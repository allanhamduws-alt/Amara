import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  pathnames: {
    "/": "/",
    "/leistungen": {
      de: "/leistungen",
      en: "/services",
    },
    "/team": "/team",
    "/ueber-uns": {
      de: "/ueber-uns",
      en: "/about-us",
    },
    "/aktuelles": {
      de: "/aktuelles",
      en: "/news",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
    "/termin": {
      de: "/termin",
      en: "/appointment",
    },
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

