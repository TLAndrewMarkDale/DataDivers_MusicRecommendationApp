"use client";

import React from "react";
import SearchBar from "@/components/search-bar-with-box";

import {
  Box,
  Button,
  Flex,
  Image,
  HStack,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import spotifyUtilityInstance from "@/utils/spotify-utils";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode("dark");
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleItemClick = (item) => {
    setSearchResult([]);
    setSearchTerm("");
    router.push("/recommendation/" + item.track_id);
  };

  const switchAccount = ()  => {
    spotifyUtilityInstance.clearSpotify();
    location.replace(spotifyUtilityInstance.loginToSpotify('/home'))
  }

  const handleInputChange = async (item) => {
    setSearchTerm(item);
    if (item.length >= 3) {
      try {
        const response = await fetch("/api/local/search/" + item + "/20/1", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();

          setSearchResult(data);
        }
      } catch (error) {}
    } else {
      setSearchResult([]);
    }
  };

  return (
    <>
      <Box p={6}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex w={"90%"} alignItems={"center"}>
            <Box w={"8%"} m={2}>
              <Image src="/recnn3-cropped.svg"></Image>
            </Box>
            <Box w={"80%"} ml={4}>
              <SearchBar
                onItemClick={handleItemClick}
                onInputChange={handleInputChange}
                searchResult={searchResult}
                searchTerm={searchTerm}
              />
            </Box>
          </Flex>

          <Flex alignItems={"center"} spacing={6}>
            <HStack
              as={"nav"}
              display={{ base: "none", md: "flex" }}
              spacing={10}
              alignItems={"center"}
            >
              {spotifyUtilityInstance.checkIfLogin() ? (
                <Menu>
                  <MenuButton as={Button} p={6} bg={'#1DB954'}>
                    {JSON.parse(spotifyUtilityInstance.getUserData())['display_name']}
                  </MenuButton>
                  <MenuList p={2} bg={useColorModeValue('#D3D3D3', '#212121')}>
                    <MenuItem p={2} bg={useColorModeValue('#D3D3D3', '#212121')} onClick={switchAccount}>Switch Account</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <div></div>
              )}

              <Stack direction={"row"} spacing={7}>
                <Button
                  onClick={toggleColorMode}
                  backgroundColor={"transparent"}
                  height={14}
                  w={14}
                  _hover={{
                    bg: "#38ef7d80",
                  }}
                >
                  {colorMode === "light" ? (
                    <MoonIcon w={"100%"} h={"100%"} />
                  ) : (
                    <SunIcon w={"100%"} h={"100%"} />
                  )}
                </Button>
              </Stack>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
