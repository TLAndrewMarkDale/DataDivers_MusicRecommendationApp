"use client";

import MusicTitles from "@/components/music-tiles";
import SearchBar from "@/components/search-bar-with-box";
import {
  Box,
  Flex,
  Heading,
  List,
  Text,
  Image,
  Divider,
  Button,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import React, { isValidElement, useEffect, useState } from "react";

const Recommendation = ({ params }) => {
  const { id } = params;
  const [selectedTrack, setSelectedTrack] = useState({
    track_id: "",
    track: "",
    artist: "",
  });

  const [playlistName, setPlaylistName] = useState('')

  const handlePlaylistName = async (event) => {

    setPlaylistName(event.target.value);
  };

  const [recommendedTrack, setRecommendedTrack] = useState([]);
  useEffect(() => {
    fetchTrackId();
    fetchRecommendedTrack();
  }, []);

  const [tracksAddToPlaylist, setTracksAddToPlaylist] = useState([]);

  const fetchTrackId = () => {
    fetch("/api/local/find/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(" Response find : ", data);
        setSelectedTrack(data);
      });
  };

  const isAddedToPlaylist = (musicItem) => {
    return tracksAddToPlaylist.find(
      (item) => item.track_id == musicItem.track_id
    );
  };

  const fetchRecommendedTrack = () => {
    fetch("/api/server/recommendations", {
      method: "POST",
      body: id,
    })
      .then((res) => res.json())
      .then((data) => {
        setRecommendedTrack(data);
      });
  };

  const toggleMode = (item, mode) => {
    if(mode == 'list-mode') {
      if(isAddedToPlaylist(item)) {
        setTracksAddToPlaylist(tracksAddToPlaylist.filter(track => track.track_id != item.track_id))
      }else {
        const newItem = Object.assign(item);
        newItem["mode"] = "playlist-mode";
        const newTracksList = JSON.parse(JSON.stringify(tracksAddToPlaylist));
        newTracksList.push(newItem);
        setTracksAddToPlaylist(newTracksList);  
      }
    }else {
      setTracksAddToPlaylist(tracksAddToPlaylist.filter(track => track.track_id != item.track_id))
    }
  };

  return (
    <Flex
      direction={"row"}
      width="100%"
      p={8}
      paddingLeft={"36"}
      maxH={"container.md"}
      h={"container.md"}
    >
      <Flex flex={6} direction={"column"} marginRight={6}>
        <Box alignItems={"center"}>
          <Flex direction={"column"} mt={6} gap={"6"}>
            <Heading size={"lg"}>Result</Heading>

            <Flex gap={"4"}>
              <Image maxW={100} maxh={100} src="/default_music.png" />

              <Flex direction={"column"} justifyContent={"center"}>
                <Text
                  textColor={useColorModeValue("black", "#fff")}
                  fontWeight={"bold"}
                >
                  {selectedTrack.track}
                </Text>
                <Text
                  textColor={useColorModeValue("#808080", "gray")}
                  fontWeight={"semibold"}
                >
                  {selectedTrack.artist.replaceAll(";", ", ")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Flex direction={"column"} mt={8}>
          <Heading>You Might Also Like</Heading>

          <List
            mt={6}
            spacing={6}
            maxH={"lg"}
            overflowY={"auto"}
            px={6}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#1DB954",
                borderRadius: "24px",
                padding: "4px",
              },
            }}
          >
            {recommendedTrack.map((item) => (
              <Flex flexDirection={"column"} gap={"4"}>
                <MusicTitles
                  key={item.track_id}
                  track_id={item["track_id"]}
                  artist={item["artist"]}
                  track={item["track"]}
                  genre={item["genre"]}
                  pop={item["pop"]}
                  addToPlaylist={isAddedToPlaylist(item)}
                  toggleMode={toggleMode}
                  mode="list-mode"
                  item={item}
                />

                <Divider borderColor={useColorModeValue("#808080", "#fff")} />
              </Flex>
            ))}
          </List>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        flex={3}
        alignItems={"center"}
        h={"container.md"}
        bg={useColorModeValue("#D3D3D3", "#212121")}
        p={6}
        borderRadius={"3xl"}
      >
        <Input
          flex={1}
          placeholder="Enter Your Playlist Name"
          outline={"none"}
          border={"none"}
          _focusVisible={{ outline: "none" }}
          fontSize={"4xl"}
          fontWeight={"black"}
          value={playlistName}
          onChange={handlePlaylistName}
          textTransform={"capitalize"}
        />
        <List
          flex={8}
          spacing={6}
          maxH={"lg"}
          overflowY={"auto"}
          w={"100%"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#1DB954",
              borderRadius: "24px",
              padding: "4px",
            },
          }}
        >
          {tracksAddToPlaylist.length > 0 ? (
            tracksAddToPlaylist.map((item) => (
              <Flex flexDirection={"column"} gap={"4"}>
                <MusicTitles
                  key={item.track_id}
                  track_id={item["track_id"]}
                  artist={item["artist"]}
                  track={item["track"]}
                  genre={item["genre"]}
                  pop={item["pop"]}
                  mode="playlist-mode"
                  toggleMode={toggleMode}
                  item={item}
                />

                <Divider borderColor={useColorModeValue("#808080", "#fff")} />
              </Flex>
            ))
          ) : (
            <Flex
              flexDirection={"column"}
              height={"100%"}
              justifyContent={"center"}
            >
              {" "}
              <Text
                textAlign={"center"}
                mb={8}
                fontSize={"3xl"}
                fontWeight={"medium"}
                color={"gray.300"}
                opacity={"0.5"}
              >
                Select the tracks you want to add
              </Text>{" "}
            </Flex>
          )}
        </List>
        <Button
          flex={1}
          bg={"#1DB954"}
          w={"md"}
          height={"16"}
          maxH={"16"}
          variant="solid"
          alignItems={"center"}
          mt={6}
          disabled={playlistName.length == 0 || tracksAddToPlaylist.length == 0}
          isDisabled={playlistName.length == 0 || tracksAddToPlaylist.length == 0}
        >
          Create Playlist
        </Button>
      </Flex>
    </Flex>
  );
};

export default Recommendation;
