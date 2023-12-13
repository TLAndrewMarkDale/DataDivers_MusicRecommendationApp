"use client";
import Login from "@/components/login";
import Navbar from "@/components/navbar";
import VerticalNavbar from "@/components/vertical-navbar";
import spotifyUtilityInstance from "@/utils/spotify-utils";
import {
  ChakraProvider,
  Flex,
  Box,
  HStack,
  Container,
  useColorModeValue,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Head } from "next/document";
import theme from "theme/theme";

// export const metadata = {
//   title: 'RecNN',
//   description: 'Recommend the playlist based on the songs you search',
// }

export default function RootLayout({ children }) {

  return (
    <html lang="en" h="100%">
      <head>
      <title>RecNN</title>      
      <link rel="icon" type="image/svg" sizes="16x16" href="/nnsquare-cropped.svg" />
        <p>Recommend the playlist based on the songs you search</p>
      </head>
      <body h="100%">
        <ChakraProvider theme={theme}>
          <Container maxW={"calc(100vw)"} w={"calc(100vw)"}>
            <Navbar />
            {spotifyUtilityInstance.checkIfLogin() ? (
              <HStack height={"100%"} maxH={"100%"}>
                <VerticalNavbar></VerticalNavbar>

                {children}
              </HStack>
            ) : (
              <Login/>
            )}
          </Container>
        </ChakraProvider>
      </body>
    </html>
  );
}
