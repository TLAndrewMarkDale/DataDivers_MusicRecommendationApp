"use client";

import React from "react";

import {
  Box,
  Flex,
  Container,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiTeamFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { Icon } from '@chakra-ui/react'

function VerticalNavbar() {
    const bg = useColorModeValue('#D3D3D3', '#212121')

  return (
            <Flex position={'relative'} height={'calc(70vh)'} p={"4"} margin={4} borderRadius={'3xl'} bg={bg} alignItems={'center'}>
              <Flex height={"auto"} flexDirection={"column"} bg={bg} gap={'6'}>
                <Box
                  as="a"
                  px={4}
                  py={2}
                  rounded={"md"}
                  bg={bg}
                  color={useColorModeValue('#000', '#fff')}
                  _hover={{
                    textDecoration: "none",
                    color: useColorModeValue('#1DB954', '#1DB954')
                  }}
                  href={"/home"}
                >
                  <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'2'}>
                    <Icon as={AiFillHome} fontSize={'4xl'}/>
                    </Flex>
                </Box>
                <Box
                  _hover={{
                    textDecoration: "none",
                    color: useColorModeValue('#1DB954', '#1DB954')
                  }}
                  as="a"
                  color={useColorModeValue('#000', '#fff')}
                  px={4}
                  py={2}
                  rounded={"md"}
                  href={"#"}
                >
                    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'2'}>
                    <Icon as={RiTeamFill} fontSize={'4xl'}/>
                    </Flex>
                </Box>
              </Flex>
            </Flex>
  );
}

export default VerticalNavbar;
