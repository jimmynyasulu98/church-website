export const siteConfig = {
  name: "CCAP Zomba",
  url: "https://ccapzomba.org",
  email: "info@ccapzomba.org",
  phone: "+265 88 511 8131",
  address: "Zomba Zero, Zomba Malawi",
  serviceTimes: [
    "Chichewa 6:00 AM - 8:00 AM",
    "English 8:00 AM - 10:00 AM",
    "Chichewa 10:00 AM - 12:00 PM",
  ],
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return siteConfig.url;
  }

  return `${siteConfig.url}${normalizedPath}`;
}
