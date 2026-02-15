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
} from "@mantine/core";
import Link from "next/link";
import { useRegisterForm } from "../hooks/use-register-form.hook";
import { authUrls } from "../urls";

export const RegisterPage = () => {
  const { form, handleSubmit, isLoading, error } = useRegisterForm();

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
            Create your account
          </Title>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
                autoComplete="off"
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                autoComplete="new-password"
                required
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                {...form.getInputProps("confirmPassword")}
                autoComplete="new-password"
                required
              />

              {error &&
                (error.status === 422 ? (
                  <Alert color="red" title="Email is already in use"></Alert>
                ) : (
                  <Alert color="red" title="Unexpected Error Occured">
                    Try again later or contact support if the problem persists.
                  </Alert>
                ))}
              <Button type="submit" loading={isLoading} fullWidth>
                Sign Up
              </Button>
              <Text size="sm" ta="center">
                Already have an account?{" "}
                <Anchor component={Link} href={authUrls.login}>
                  Sign in
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Container>
  );
};
