import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function MusicTitles(props) {
  const { track_id, artist, track, genre, pop, item, onItemClick } = props;

  return (
    <>
      <Flex gap={"6"}>
        <Image maxW={"4rem"} src="/default_music.png" />

        <Flex direction={"column"} justifyContent={"center"}>
          <Text textColor={'black'} fontWeight={'bold'}>{track}</Text>
          <Text textColor={'gray'}  fontWeight={'bold'}>
            {artist.replaceAll(';', ', ')}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default MusicTitles;
