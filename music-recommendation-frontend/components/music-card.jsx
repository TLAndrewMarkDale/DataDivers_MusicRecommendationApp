import spotifyUtilityInstance from "@/utils/spotify-utils";
import { Card, CardBody, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";

function MusicCard(props) {
  const { track_id, artist, track, genre, pop, item, onItemClick } = props;

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
              src={image || "/default_music.png"}
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
