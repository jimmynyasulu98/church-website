export type NavLink = {
  label: string;
  href: string;
};

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Districts", href: "/#mlaga" },
  { label: "Mlaga", href: "/#mlaga" },
  { label: "Sermons", href: "/#sermons" },
  { label: "Events", href: "/#events" },
  { label: "News", href: "/#sermons" },
  { label: "Giving", href: "/#giving" },
  { label: "Contact", href: "/#contact" },
];

export const footerQuickLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Districts", href: "/#mlaga" },
  { label: "Mlaga", href: "/#mlaga" },
  { label: "Sermons", href: "/#sermons" },
  { label: "Events", href: "/#events" },
  { label: "News", href: "/#sermons" },
  { label: "Giving", href: "/#giving" },
  { label: "Vacancies", href: "/" },
  { label: "Contact Us", href: "/#contact" },
];
