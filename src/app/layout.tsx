import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my work and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen">
              <Header />
              <main className="container mx-auto px-4 flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="menu p-4 w-80 min-h-full bg-base-200">
                {/* Sidebar content */}
                <nav className="space-y-2">
                  <Link href="/" className="btn btn-ghost w-full justify-start">Home</Link>
                  <Link href="/blog" className="btn btn-ghost w-full justify-start">Blog</Link>
                  <Link href="/lab" className="btn btn-ghost w-full justify-start">Lab</Link>
                  <Link href="/contact" className="btn btn-ghost w-full justify-start">Contact</Link>
                </nav>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
