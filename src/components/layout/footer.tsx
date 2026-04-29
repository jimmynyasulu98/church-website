import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import logo from "@/public/ccap_logo.png";

const quickLinks = [
  "About Us",
  "Ministries",
  "Districts",
  "Mlaga",
  "Sermons",
  "Events",
  "News",
  "Giving",
  "Vacancies",
  "Contact Us",
];

const serviceTimes = [
  ["Chichewa Service", "6:00 AM - 8:00 AM"],
  ["English Service", "8:00 AM - 10:00 AM"],
  ["Chichewa Service", "10:00 AM - 12:00 PM"],
];

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="CCAP Zomba logo"
              className="h-14 w-14 object-contain"
            />
            <span className="leading-tight">
              <span className="block text-xl font-black">CCAP ZOMBA</span>
              <span className="block text-xs text-blue-100">
                Church of Central Africa Presbytery
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs leading-7 text-blue-50">
            Making disciples of Jesus Christ through Worship, Fellowship,
            Discipleship and Service.
          </p>
          <div className="mt-6 flex gap-3 text-blue-100">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-black">
              f
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-black">
              ▶
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-black">
              ◎
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide">
            Quick Links
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link}
                href="#home"
                className="text-sm text-blue-50 transition hover:text-white"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide">
            Contact Info
          </h2>
          <div className="mt-6 space-y-5 text-sm text-blue-50">
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-white" />
              Ndirande Road, Zomba, Malawi
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-white" />
              +265 88 123 4567
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-white" />
              info@ccapzomba.org
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide">
            Service Times
          </h2>
          <div className="mt-6 space-y-5 text-sm text-blue-50">
            {serviceTimes.map(([label, time]) => (
              <p key={label + time} className="flex justify-between gap-6">
                <span>{label}</span>
                <span>{time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/15 px-4 py-6 text-sm text-blue-50 sm:px-6 md:flex-row lg:px-8">
        <p>© 2024 CCAP Zomba. All Rights Reserved.</p>
        <p className="flex gap-5">
          <Link href="#home">Privacy Policy</Link>
          <span>|</span>
          <Link href="#home">Terms of Use</Link>
        </p>
      </div>
    </footer>
  );
}
