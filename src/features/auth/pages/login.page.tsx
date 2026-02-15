"use client";

import {
  Container,
  Paper,
  Title,
  Center,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Anchor,
  Alert,
  Checkbox,
} from "@mantine/core";
import Link from "next/link";
import { useLoginForm } from "../hooks/use-login-form.hook";
import { authUrls } from "../urls";

export const LoginPage = () => {
  const { form, handleSubmit, isLoading, error } = useLoginForm();

  return (
    <Container size="xs" py="xl">
      <Center>
        <Paper
          shadow="md"
          p="xl"
          radius="md"
          withBorder
          style={{ width: "100%" }}
        >
          <Title order={2} mb="lg" ta="center">
            Welcome back
          </Title>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
                autoComplete="email"
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                autoComplete="current-password"
                required
              />
              <Checkbox
                label="Remember me"
                {...form.getInputProps("rememberMe", { type: "checkbox" })}
              />

              {error &&
                (error.status === 401 || error.status === 422 ? (
                  <Alert color="red" title="Invalid email or password"></Alert>
                ) : (
                  <Alert color="red" title="Unexpected Error Occured">
                    Try again later or contact support if the problem persists.
                  </Alert>
                ))}
              <Button type="submit" loading={isLoading} fullWidth>
                Sign In
              </Button>
              <Text size="sm" ta="center">
                Don&apos;t have an account?{" "}
                <Anchor component={Link} href={authUrls.register}>
                  Sign up
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Container>
  );
};
