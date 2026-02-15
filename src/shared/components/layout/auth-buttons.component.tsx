"use client";

import { Group, Button } from "@mantine/core";
import Link from "next/link";
import { authUrls } from "@/features/auth";

export const AuthButtons = () => {
  return (
    <Group gap="xs" visibleFrom="sm">
      <Link href={authUrls.login} style={{ textDecoration: "none" }}>
        <Button variant="default">Login</Button>
      </Link>
      <Link href={authUrls.register} style={{ textDecoration: "none" }}>
        <Button>Register</Button>
      </Link>
    </Group>
  );
};
