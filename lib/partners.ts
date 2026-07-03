export interface Partner {
  name: string;
  logo: string;
}

// Drop your 8 partner logos into public/partners/ using the file names below.
// Best format: SVG (crispest) or PNG with transparent background.
// Target dimensions: roughly 400×160 (2.5:1). Anything close works.
// Update the `name` fields once you tell me who the partners are — the current
// labels are placeholders that show only in alt text and screen readers.
export const partners: Partner[] = [
  { name: "Partner 01", logo: "/partners/partner-01.png" },
  { name: "Partner 02", logo: "/partners/partner-02.png" },
  { name: "Partner 03", logo: "/partners/partner-03.png" },
  { name: "Partner 04", logo: "/partners/partner-04.png" },
  { name: "Partner 05", logo: "/partners/partner-05.png" },
  { name: "Partner 06", logo: "/partners/partner-06.png" },
  { name: "Partner 07", logo: "/partners/partner-07.png" },
  { name: "Partner 08", logo: "/partners/partner-08.png" },
];
