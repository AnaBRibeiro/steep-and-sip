import type { Metadata } from "next";

export const SITE_NAME = "Steep & Sip";
export const SITE_URL = "https://steep-and-sip.vercel.app";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

/** Builds a full Metadata object (title, description, canonical URL, Open Graph, Twitter card) for a public page. */
export function buildPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Steep & Sip — Find Your Tea Routine",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
