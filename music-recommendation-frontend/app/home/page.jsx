"use client";
import MusicCard from "@/components/music-card";
import {
  Box,
  Flex,
  Heading,
  Wrap,
  VStack,
  List,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [trendingList, setTrendingList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [user, setUser] = useState([]);
  const [image, setImage] = useState('');

  useEffect(() => {
    // const trackid = localStorage.getItem('track-id');

    // if(trackid) {
    //   localStorage.removeItem(trackid)
    //   localStorage.removeItem('track-id')
    // }
    fetch("/api/server/top10")
      .then((res) => res.json())
      .then((data) => {
        setTrendingList(data);
      });
  }, []);

  const handleItemClick = (item) => {
    router.push("/recommendation/" + item.track_id);
  };

  return (
    <Container
      w="100%"
      h="100%"
      p={0}
      m={0}
      maxW={"100%"}
      maxH={"100%"}
      style={{}}
    >
      <Flex
        h="100%"
        w={"100%"}
        direction="column"
        mt={6}
        alignItems={"center"}
        justifyContent={"center"}
      >

        <Flex direction={"column"} w={"80%"} minHeight={'container.md'}>
          <VStack align={"flex-start"}>
            <Heading size={"lg"} marginBottom={"6"}>
              Trending Songs for you
            </Heading>
            <List
              spacing={6}
              align="flex-start"
              overflowY={"auto"}
              maxH={"container.md"}
              css={
                {
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#1DB954',
                    borderRadius: '24px',
                    padding: '4px',
                  },
                }
              }
            >
              <Wrap spacing={"10"}>
                {trendingList.map((item) => (
                  <MusicCard
                    key={item["track_id"]}
                    track_id={item["track_id"]}
                    artist={item["artist"]}
                    track={item["track"]}
                    genre={item["genre"]}
                    pop={item["pop"]}
                    item={item}
                    onItemClick={handleItemClick}
                  />
                ))}

              </Wrap>
            </List>
          </VStack>
        </Flex>
      </Flex>
    </Container>
  );
}
