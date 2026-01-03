import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Logo variant="light" className="h-16 w-auto mb-4" />
            <p className="text-white/80 text-sm leading-relaxed mt-4">
              {t("footer.practice")}
            </p>
            <p className="text-white/60 text-sm mt-2">
              Eidelstedter Platz 6a<br />
              22523 Hamburg
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact.info.title")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  Eidelstedter Platz 6a<br />
                  22523 Hamburg
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/60 flex-shrink-0" />
                <a 
                  href="tel:040576061" 
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  040 576061
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/60 flex-shrink-0" />
                <a 
                  href="mailto:int.hausarzt.eidelstedt@gmx.de" 
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  int.hausarzt.eidelstedt@gmx.de
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("home.hours.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-white/80">
                <span>{t("home.hours.monday")} - {t("home.hours.tuesday")}</span>
                <span>08:00 - 13:00</span>
              </li>
              <li className="flex justify-between text-white/60 text-xs pl-4">
                <span></span>
                <span>15:00 - 17:30</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>{t("home.hours.wednesday")} - {t("home.hours.friday")}</span>
                <span>08:00 - 13:00</span>
              </li>
              <li className="flex items-center gap-2 mt-4 text-white/60">
                <Clock className="h-4 w-4" />
                <span className="text-xs">
                  {t("home.hours.emergency")}: {t("home.hours.emergencyTime")}
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/leistungen" 
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/team" 
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  {t("nav.team")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/termin" 
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  {t("nav.appointment")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Praxis Amara. {t("footer.rights")}.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/impressum" 
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {t("nav.imprint")}
              </Link>
              <Link 
                href="/datenschutz" 
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {t("nav.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

