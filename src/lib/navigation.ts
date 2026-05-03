export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Districts", href: "/districts" },
  { label: "Mlaga", href: "/mlaga" },
  {
    label: "Media",
    href: "/sermons",
    children: [
      { label: "Sermons", href: "/sermons" },
      { label: "Events", href: "/events" },
      { label: "News", href: "/news" },
    ],
  },
  { label: "Giving", href: "/giving" },
  { label: "Vacancies", href: "/vacancies" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Districts", href: "/districts" },
  { label: "Mlaga", href: "/mlaga" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Giving", href: "/giving" },
  { label: "Vacancies", href: "/vacancies" },
  { label: "Contact Us", href: "/contact" },
];
