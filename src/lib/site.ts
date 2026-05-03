export const siteConfig = {
  name: "CCAP Zomba",
  url: "https://ccapzomba.org",
  email: "info@ccapzomba.org",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return siteConfig.url;
  }

  return `${siteConfig.url}${normalizedPath}`;
}
