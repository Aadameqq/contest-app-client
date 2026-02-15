"use client";

import { Group, Text, Burger, Box, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher.component";
import { AuthButtons } from "./auth-buttons.component";

const navItems = [
  { href: "/contests", label: "Contests" },
  { href: "/about", label: "About" },
];

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box px="md" py="sm">
      <Group justify="space-between" h="100%">
        <Group gap="xl">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text size="xl" fw={700} c="var(--mantine-color-text)">
              Contest App
            </Text>
          </Link>

          <Group gap="md" visibleFrom="sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Text
                  c={colorScheme === "dark" ? "gray.4" : "gray.7"}
                  size="sm"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </Group>
        </Group>

        <Group gap="sm">
          <ThemeSwitcher />
          <AuthButtons />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Group>
    </Box>
  );
};
