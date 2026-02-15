import { Box, Text, Center } from "@mantine/core";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" py="md" px="md">
      <Center>
        <Text size="sm" c="dimmed">
          © {year} Contest App. All rights reserved.
        </Text>
      </Center>
    </Box>
  );
};
