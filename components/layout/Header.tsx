"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const navigation = [
  { href: "/", labelKey: "home" },
  { href: "/leistungen", labelKey: "services" },
  { href: "/team", labelKey: "team" },
  { href: "/ueber-uns", labelKey: "about" },
  { href: "/aktuelles", labelKey: "news" },
  { href: "/kontakt", labelKey: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo className={cn("h-14 w-auto transition-opacity", isScrolled ? "opacity-100" : "opacity-95")} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : isScrolled
                      ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      : "text-foreground/90 hover:text-primary hover:bg-white/50"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {/* CTA Button - Desktop */}
            <Button asChild className="hidden md:flex" size="sm">
              <Link href="/termin">
                {t("appointment")}
              </Link>
            </Button>

            {/* Phone Button - Desktop */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center gap-2"
              asChild
            >
              <a href={`tel:${process.env.NEXT_PUBLIC_PRACTICE_PHONE?.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">{process.env.NEXT_PUBLIC_PRACTICE_PHONE || "040 576061"}</span>
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <nav className="flex flex-col gap-2 mt-8">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== "/" && pathname.startsWith(item.href));
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    );
                  })}
                  
                  <div className="border-t border-border mt-4 pt-4 space-y-3">
                    <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="/termin">
                        {t("appointment")}
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`tel:${process.env.NEXT_PUBLIC_PRACTICE_PHONE?.replace(/\s/g, "")}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {process.env.NEXT_PUBLIC_PRACTICE_PHONE || "040 576061"}
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

