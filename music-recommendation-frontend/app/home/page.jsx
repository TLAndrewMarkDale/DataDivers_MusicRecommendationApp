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
import React, { useEffect, useState } from "react";

import SpotifyWebApi from "spotify-web-api-js";
import { loginURL } from "./login";
import { getTokenFromURL } from "./login";
const spotify = new SpotifyWebApi();

export default function Home() {
  const router = useRouter();
  const [trendingList, setTrendingList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/local/trending", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTrendingList(data);
      });

    const token = getTokenFromURL().access_token;

    window.location.hash = "";

    if (token) {
      spotify.setAccessToken(token);

      spotify.getMe().then((user) => {
        console.log("Person: ", user);
        setUser(user);

        
      });
    }
  });

  const handleItemClick = (item) => {
    router.push("/recommendation/" + item.track_id);
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
          {/* <Box w="40%">
            <SearchBar
              onItemClick={handleItemClick}
              onInputChange={handleInputChange}
              searchResult={searchResult}
            />
          </Box> */
          /** if there is a user logged in, say hi*/
          }
          {spotify.getAccessToken() ? (<a>Hi, {user.display_name}</a>) : (<a href={loginURL} id = "signInButton"> Login </a>)}
          
          <Box w="65%" marginTop={8}>
            <Flex
              direction={"column"}
              alignItems={"start"}
              justifyContent={"center"}
            >
              <Heading size={"lg"}>Trending Songs for you</Heading>

              <Wrap spacing="60px" mt={6}>
                {trendingList.map((item) => (
                  <MusicCard
                    key={item['track_id']}
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
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
