import { SiteFooter } from "@/components/site/site-footer";
import { BottomBlur } from "@/components/site/bottom-blur";
import { CommandPalette } from "@/components/site/command-palette";
import { Terminal } from "@/components/site/terminal";
import { allPosts } from "content-collections";
import { SiteHeader } from "@/components/site/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import { Caveat, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./site.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: ["normal", "italic"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"] });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: "600" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { title: SITE.name, card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const palettePosts = allPosts.map((p) => ({ title: p.title, slug: p._meta.path.replace(/\.mdx$/, "") }));

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} ${hand.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <div className="shell">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <BottomBlur />
            <CommandPalette posts={palettePosts} />
            <Terminal />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
