import { Card, CardBody, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function MusicCard(props) {
  const { track_id, artist, track, genre, pop, item, onItemClick } = props;

  const handleItemClick = (item) => {
    return (e) => {
      if (typeof onItemClick === "function") {
        onItemClick(item);
      }
    };
  };

  return (
      <Card
        pointerEvents="auto"
        cursor={"pointer"}
        w={'14rem'}
        height={"16rem"}
        background={"transparent"}
        onClick={handleItemClick(item)}
      >
        <CardBody
          position={"relative"}
          w={"100%"}
          h={"100%"}
          background={"transparent"}
          borderRadius='lg'
        >
          <Image
            position={"absolute"}
            w={"100%"}
            borderRadius='lg'
            top={0}
            zIndex={-1}
            left={0}
            h={"100%"}
            src="/default_music.png"
          />

          <Stack position={'absolute'} bottom={6} left={4} spacing="3">
            <Heading
              size="md"
              maxW={'14rem'}
              noOfLines={2}
              color={useColorModeValue('#D3D3D3', '#fff')}
            >
              {track}
            </Heading>
            <Text
              maxW={'14rem'}
              noOfLines={1}
              color={useColorModeValue('#D3D3D3', '#fff')}
            >
              {artist.replaceAll(";", ", ")}
            </Text>
          </Stack>
        </CardBody>
      </Card>
  );
}

export default MusicCard;
