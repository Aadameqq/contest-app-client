"use client";

import { AppShell as MantineAppShell } from "@mantine/core";
import { Navbar } from "./navbar.component";
import { Footer } from "./footer.component";

type AppShellProps = {
  children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <MantineAppShell header={{ height: 60 }} padding="md">
      <MantineAppShell.Header>
        <Navbar />
      </MantineAppShell.Header>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>

      <Footer />
    </MantineAppShell>
  );
};
