"use client";
import Navbar from "@/components/navbar";
import VerticalNavbar from "@/components/vertical-navbar";
import { ChakraProvider, Flex, Box, useColorModeValue, HStack, Container } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import theme from "theme/theme";

// export const metadata = {
//   title: 'RecNN',
//   description: 'Recommend the playlist based on the songs you search',
// }

export default function RootLayout({ children }) {

  return (
    <html lang="en" h="100%">
      <body h="100%">
        <ChakraProvider theme={theme}>
          <Container maxW={'calc(100vw)'} w={'calc(100vw)'}>
          <Navbar />
          <HStack height={'100%'} maxH={'100%'}>
            <VerticalNavbar></VerticalNavbar>
            {children}
          </HStack>
          </Container>

        </ChakraProvider>
      </body>
    </html>
  );
}
