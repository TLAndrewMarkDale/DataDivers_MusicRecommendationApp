import { Flex, Image, Text, useColorModeValue, Button, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import spotifyUtilityInstance from "@/utils/spotify-utils";

function MusicTitles(props) {
  const { track_id, artist, track, genre, pop, item, onItemClick, addToPlaylist, mode, toggleMode } = props;
  const [image, setImage] = useState('/default_music.png');


  useEffect(() =>{
    getImage(track_id)
  }, [])

  /** get image from tack and save it in the public folder */
  const getImage = () => {
    spotifyUtilityInstance.getSpotifyInstance().searchTracks(track, {limit: 1}).then((data) => {
      console.log('Data : ', data)
      if(data && data.tracks) {
         setImage(data.tracks.items[0].album.images[0].url);
      }else {
        return '/default_music.png'
      }
    }).catch(error => {
      return '/default_music.png'
    })
  }

  const handleItemClick = (item) => {
    return (e) => {
        toggleMode(item, mode);
    };
  };

  return (
    <>
      <Flex gap={"6"}>
        <Image flex={2} maxW={"4rem"} src={ image || "/default_music.png"} />

        <Flex flex={7} direction={"column"} justifyContent={"center"}>
          <Text textColor={useColorModeValue('black', '#fff')} fontWeight={'bold'} noOfLines={2}>{track}</Text>
          <Text textColor={useColorModeValue('#808080', 'gray')}  fontWeight={'semibold'} noOfLines={1}>
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
