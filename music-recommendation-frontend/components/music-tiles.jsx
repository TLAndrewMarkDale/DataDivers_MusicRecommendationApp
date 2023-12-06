import { Flex, Image, Text, useColorModeValue, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function MusicTitles(props) {
  const { track_id, artist, track, genre, pop, item, onItemClick, addToPlaylist, mode, toggleMode } = props;

  const handleItemClick = (item) => {
    return (e) => {
        toggleMode(item, mode);
    };
  };

  return (
    <>
      <Flex gap={"6"}>
        <Image flex={2} maxW={"4rem"} src="/default_music.png" />

        <Flex flex={7} direction={"column"} justifyContent={"center"}>
          <Text textColor={useColorModeValue('black', '#fff')} fontWeight={'bold'}>{track}</Text>
          <Text textColor={useColorModeValue('#808080', 'gray')}  fontWeight={'semibold'}>
            {artist.replaceAll(';', ', ')}
          </Text>
        </Flex>
        <Button flex={1} height={'16'} variant={'ghost'} onClick={handleItemClick(item)}>
            { mode == 'list-mode' ? (addToPlaylist ? 
             <Icon as={MdOutlinePlaylistAddCheck} fontSize={'2xl'}/> 
            : <Icon as={MdOutlinePlaylistAdd} fontSize={'2xl'}/>) : (
              <Icon as={AiFillDelete} fontSize={'2xl'}></Icon>
            )}
        </Button>
      </Flex>
    </>
  );
}

export default MusicTitles;
