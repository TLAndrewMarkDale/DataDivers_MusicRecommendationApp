'use client';

import MusicTitles from '@/components/music-tiles'
import SearchBar from '@/components/search-bar-with-box'
import { Box, Flex, Heading, List, Text, Image, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Recommendation = ({params}) => {
    const {id} = params;
    const [selectedTrack, setSelectedTrack] = useState({
        track_id : '',
        track: '',
        artist: '',
    })
    const [recommendedTrack, setRecommendedTrack] = useState([])
    useEffect(() => {
        fetchTrackId();
        fetchRecommendedTrack();
    }, [])

    const fetchTrackId = () => {
        fetch('/api/local/find/' + id).then(res => res.json()).then(data => {
            console.log(" Response find : ", data);
            setSelectedTrack(data)
        })
    }

    const fetchRecommendedTrack = () => {
         fetch('/api/server/recommendations', {
             method: 'POST',
             body: id,
             
         }).then(res => res.json()).then(data => {
             console.log(" Recommendation : ", data);
             setRecommendedTrack(data)
         })
    }

    // useEffect(() => {

    //     // fetch('/api/server/recommendation', {
    //     //     method: 'POST',
    //     //     body: track_id
    //     // }).then(res => res.json()).then(data => {
    //     //     console.log(" Recommendation : ", data);
    //     //     setRecommendedTrack(data)
    //     // })
    // })

  return (  
    <Flex direction={'column'} alignItems={'center'} width='100%' p={8}>
        <Box width='50%' alignItems={'center'} >
        {/* <SearchBar /> */}
        
        <Flex direction={'column'} mt={8} gap={'6'}>
            {/* 
            //TODO : Using prop pass the 
            */}
            <Heading size={'lg'}>Result</Heading>

            <Flex gap={'4'}>

            <Image 
                    maxW={100}
                    maxh={100}
                    src='/default_music.png'
             />

            <Flex direction={'column'} justifyContent={'center'}>
                <Text textColor={'black'} fontWeight={'bold'}>{selectedTrack.track}</Text>
                <Text textColor={'gray'} fontWeight={'bold'}>{selectedTrack.artist.replaceAll(';', ', ')}</Text>
            </Flex>

            </Flex>
        </Flex>
        </Box>
        
        <Flex direction={'column'} mt={8} width='50%'>
            
            <Heading>You Might Also Like</Heading>
            
            <List mt={6} spacing={6} maxH={'lg'} overflowY={'scroll'} px={6}>
                { recommendedTrack.map(item => 
                
                <Flex flexDirection={'column'} gap={'4'}>
                    <MusicTitles key={item.track_id}  track_id={item["track_id"]}
                    artist={item["artist"]}
                    track={item["track"]}
                    genre={item["genre"]}
                    pop={item["pop"]}
                    item={item}/>

                    <Divider/>
                </Flex>
                    
                    
                ) }
            </List>
        </Flex>        
    </Flex>
  )
}

export default Recommendation