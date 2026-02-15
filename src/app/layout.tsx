import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { AppShell } from "@/shared/components/layout";
import { QueryProvider } from "@/shared/components/providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contest App",
  description: "Compete and win amazing prizes",
};

const theme = createTheme({
  fontFamily: "var(--font-space-grotesk), sans-serif",
  fontFamilyMonospace: "var(--font-geist-mono), monospace",
  primaryColor: "blue",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <MantineProvider theme={theme}>
            <AppShell>{children}</AppShell>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
