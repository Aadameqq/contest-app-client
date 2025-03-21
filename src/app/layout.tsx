import type { Metadata } from "next";
import "./globals.css";
import { AppShellHeader, AppShellMain, MantineProvider } from "@mantine/core";
import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import Navbar from "./_components/navbar";
import { ReactQueryProvider } from "@/features/layout/react-query";

export const metadata: Metadata = {
  title: "Contest App",
  description: "Platform for organizing programming contests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <MantineProvider defaultColorScheme="dark">
            <AppShell header={{ height: 60 }} padding="md">
              <AppShellHeader>
                <Navbar />
              </AppShellHeader>

              <AppShellMain>{children}</AppShellMain>
            </AppShell>
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
