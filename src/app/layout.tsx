import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteName: string = "璃奈ちゃんボード";
const description: string = "璃奈ちゃんボードのサイト";
const url: string = process.env.NEXT_PUBLIC_BASE_URL || "";
const googleSearchConsole: string = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE || "";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: siteName,
  description,
  keywords: ["璃奈ちゃん", "璃奈ちゃんボード", "虹ヶ咲学園スクールアイドル同好会", "ニジガク", "Rinachan", "rinachan"],
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${url}/ogp_default.png`,
        width: 1200,
        height: 630,
        alt: "璃奈ちゃんボードのイメージ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: [
      {
        url: `${url}/ogp_default.png`,
        width: 1200,
        height: 630,
        alt: "璃奈ちゃんボードのイメージ",
      },
    ],
    site: "@",
    creator: "@",
  },
  verification: {
    google: googleSearchConsole,
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
