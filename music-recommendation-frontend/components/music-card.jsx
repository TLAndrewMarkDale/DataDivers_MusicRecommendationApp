import { Card, CardBody, Heading, Image, Stack,Text } from '@chakra-ui/react'
import React from 'react'

function MusicCard(props) {

    const {track_id, artist, track, genre, pop, item, onItemClick } = props

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
                    maxW={150}
                    maxh={150}
                    src='/default_music.png'
                    borderRadius={'lg'}
                />

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