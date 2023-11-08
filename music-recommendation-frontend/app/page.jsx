"use client";
import MusicCard from "@/components/music-card";
import SearchBar from "@/components/search-bar-with-box";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [trendingList, setTrendingList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch("/api/trending", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTrendingList(data);
      });
  });

  const handleItemClick = (item) => {
    router.push("/recommendation");
  };

  const handleInputChange = async (item) => {
    if(item.length >= 3) {
      try {
        const response = await fetch("/api/search/" + item + "/20/1", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
  
          setSearchResult(data)
        }
      } catch (error) {}
    }else {
      setSearchResult([])
    }

  };

  return (
    <>
      <Box w="100%" h="100%">
        <Flex
          h="100%"
          direction="column"
          mt={20}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box w="60%">
            <SearchBar
              onItemClick={handleItemClick}
              onInputChange={handleInputChange}
              searchResult={searchResult}
            />
          </Box>

          <Box w="70%" marginTop={8}>
            <Flex
              direction={"column"}
              alignItems={"start"}
              justifyContent={"center"}
            >
              <Heading size={"lg"}>Trending Songs for you</Heading>

              <Wrap spacing="60px" mt={6}>
                {trendingList.map((item) => (
                  <MusicCard
                    track_id={item["track_id"]}
                    artist={item["artist"]}
                    track={item["track"]}
                    genre={item["genre"]}
                    pop={item["pop"]}
                  />
                ))}
              </Wrap>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
