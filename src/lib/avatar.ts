export function initials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

/** Initials avatar as a data URL, in the design's primary-fixed palette. */
export function initialsAvatar(name: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#d6e3ff"/><text x="24" y="30" text-anchor="middle" font-family="Inter,sans-serif" font-size="17" font-weight="600" fill="#004e99">${initials(name)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
