"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
} from "lucide-react";

import logo from "@/public/ccap_logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/#new-here" },
  { label: "Districts", href: "/#mlaga" },
  { label: "Mlaga", href: "/#mlaga" },
  { label: "Sermons", href: "/#sermons" },
  { label: "Events", href: "/#events" },
  { label: "News", href: "/#sermons" },
  { label: "Giving", href: "/#giving" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.includes("#")) {
      return false;
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-primary text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs font-medium sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 sm:flex">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              CCAP Zomba
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              info@ccapzomba.org
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              +265 88 123 4567
            </span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[10px] font-black">
              f
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[10px] font-black">
              ▶
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[10px] font-black">
              ◎
            </span>
            <span className="h-4 w-px bg-white/30" />
            <span className="flex items-center gap-1">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
              EN | CH
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <Image
            src={logo}
            alt="CCAP Zomba logo"
            className="h-14 w-14 object-contain"
            priority
          />
          <span className="leading-tight">
            <span className="block text-2xl font-black tracking-tight">
              CCAP ZOMBA
            </span>
            <span className="block text-xs font-semibold text-slate-600">
              Church of Central Africa Presbytery
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = isCurrentPage(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "border-b-2 border-transparent px-3 py-7 text-sm font-extrabold text-primary transition hover:border-accent hover:text-accent",
                  isActive && "border-accent text-accent",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="h-11 rounded-sm px-5 text-xs font-black">
            <Link href="/#new-here">I&apos;m New Here</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>CCAP Zomba</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-2" aria-label="Mobile primary">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-100 hover:text-primary",
                      isCurrentPage(link.href) && "bg-blue-50 text-accent",
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild className="mt-8 w-full">
                <Link href="/#new-here">I&apos;m New Here</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
