"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="default"
      size="lg"
      aria-label="Toggle theme"
    >
      {colorScheme === "dark" ? (
        <IconSun size={20} stroke={1.5} />
      ) : (
        <IconMoon size={20} stroke={1.5} />
      )}
    </ActionIcon>
  );
};
