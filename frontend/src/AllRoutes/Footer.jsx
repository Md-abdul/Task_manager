import { Flex, Box, Text, Link } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="gray.100"
      color="black"
      py={4}
      px={6}
    //   position="fixed"
    //   bottom={0}
      width="100%"
    >
      <Box>
        <Text fontSize="md">© 2024 Task Manager </Text>
      </Box>
      <Box>
        <Link mx={2} href="#">
          Terms of Service
        </Link>
        <Link mx={2} href="#">
          Privacy Policy
        </Link>
        <Link mx={2} href="#">
          Contact Us
        </Link>
      </Box>
    </Flex>
  );
};

export default Footer;
