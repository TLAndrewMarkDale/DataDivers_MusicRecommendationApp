import { Card, CardBody, Heading, Image, Stack,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import SpotifyWebApi from "spotify-web-api-js";

function MusicCard(props) {

    const {track_id, artist, track, genre, pop, item, onItemClick } = props
    const [image, setImage] = useState('/default_music.png');
    
    /** get image from tack and save it in the public folder */
    const spotify = new SpotifyWebApi();
    const getImage = (track) => {
      setImage(spotify.searchTracks(track, {limit: 1}).then((data) => {
        return data.tracks.items[0].album.images[0].url;
      }));
    }

    const handleItemClick = (item) => {
        return (e) => {
         

          if (typeof onItemClick === "function") {
            onItemClick(item);
          }
        };
      };

    return (
    <>
        <Card pointerEvents='auto' cursor={'pointer'} onClick={handleItemClick(item)}>
            <CardBody>
              
                <Image 
                    src={image || '/default_music.png'}
                    width={150}
                    height={150}
                >
                </Image>

                <Stack mt={6} spacing='3'>
                    <Heading size='md' noOfLines={2} maxWidth={150}>{track}</Heading>
                    <Text noOfLines={1} maxWidth={150}>{artist.replaceAll(';', ', ')}</Text>
                </Stack>
            </CardBody>
        </Card>
    </>
  )
}

export default MusicCard