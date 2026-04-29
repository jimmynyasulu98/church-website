import Link from "next/link";
import { Church, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = ["About", "Ministries", "Events", "News", "Giving", "Contact"];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-primary">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white">
              <Church className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold">Mlaga Church</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            A welcoming church family serving our neighborhoods through worship,
            discipleship, outreach, and practical care.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Quick Links
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {footerLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-600 transition hover:text-accent"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Contact
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              Mlaga District, Malawi
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              +265 000 000 000
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
              hello@mlagachurch.org
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
        © 2026 Mlaga Church. All rights reserved.
      </div>
    </footer>
  );
}
