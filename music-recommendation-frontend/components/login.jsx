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

export default function Login() {
    const handleClick = () => {
        // location.href()
        location.replace(spotifyUtilityInstance.loginToSpotify('/home'))
      }

    return (
        <VStack height={"100%"} maxH={"100%"} mt={'5rem'}>
        <Flex gap={2}>
          <Text color={useColorModeValue('#000', '#fff')} fontWeight={'semibold'} fontSize={'4xl'}>To get started, Please login to</Text>
          <Text color={'#1DB954'} fontWeight={'black'} fontSize={'4xl'}>Spotify</Text>
        </Flex>

        <Button 
        bg={"#1DB954"}
        w={"md"}
        height={"16"}
        maxH={"16"}
        variant="solid"
        alignItems={"center"}
        mt={6}
        onClick={handleClick}
        >Click here to Login</Button>
      </VStack>
    )
}