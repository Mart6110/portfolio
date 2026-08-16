import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dictionaries } from "@/lib/i18n/dictionary";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: dictionaries.en.meta.title,
  description: dictionaries.en.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
