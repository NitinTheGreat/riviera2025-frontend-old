import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar, Footer } from "../components";

//todo: change default font's using next/font once we get the font files
const fkTrial = localFont({
  src: [
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Regular.otf",
      style: "normal",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--fk-trial",
});

export const metadata: Metadata = {
  title: "Riviera 2025",
  description:
    "The Annual International Sports and National Cultural Festival. We invite Participants from all colleges for the 3 days Riviera 2025 Events. Register Now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fkTrial.variable} antialiased`}>
        <Navbar />
        <div className="relative">
          <div className="flex min-h-screen mx-auto flex-col max-w-[90rem] bg-background px-4 md:px-6">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
