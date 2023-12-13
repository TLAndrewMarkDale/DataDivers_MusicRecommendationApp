"use client";

import LoginWarningModel from "@/components/login-warning-model";
import MusicTitles from "@/components/music-tiles";
import SearchBar from "@/components/search-bar-with-box";
import spotifyUtilityInstance from "@/utils/spotify-utils";
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
  Icon,
  Tooltip,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

import {
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";

import React, { isValidElement, useEffect, useState } from "react";
import { IoRefreshCircle } from "react-icons/io5";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const Recommendation = ({ params }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPLaylistCreating, setIsPLaylistCreating] = useState(false);
  const [image, setImage] = useState("");

  const { id } = params;
  const [selectedTrack, setSelectedTrack] = useState({
    track_id: "",
    track: "",
    artist: "",
  });

  const [playlistName, setPlaylistName] = useState("");
  const [tracksAddToPlaylist, setTracksAddToPlaylist] = useState([]);

  const handlePlaylistName = async (event) => {
    setPlaylistName(event.target.value);
    savePlaylist(playlistName, tracksAddToPlaylist);
  };

  const savePlaylist = (name, trackList) => {
    const data = {
      name : name,
      trackList: trackList
    }
    localStorage.setItem('playlist-data', JSON.stringify(data))
  };

  const createPlaylist = () => {
    setIsPLaylistCreating(true);
    spotifyUtilityInstance
      .createPlaylist({
        playlist_name: playlistName,
        track_list: tracksAddToPlaylist,
      })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          spotifyUtilityInstance
            .addTracksToPlaylist({
              playlist_id: data.id,
              track_list: tracksAddToPlaylist,
            })
            .then((res) => res.json())
            .then((trackData) => {
              if (trackData) {
                setIsPLaylistCreating(false);
                onOpen();
                setTracksAddToPlaylist([]);
                localStorage.removeItem('playlist-data')
                setPlaylistName("");
              }
              console.log("Tracks response : ", trackData);
            });
        }
      });
  };

  const [recommendedTrack, setRecommendedTrack] = useState([]);
  useEffect(() => {
    if(localStorage.getItem('playlist-data')) {
      // console.log(" Data : ", localStorage.getItem('playlist-data'))
      const playlistData = JSON.parse(localStorage.getItem('playlist-data'));
      setPlaylistName(playlistData.name)
      setTracksAddToPlaylist(playlistData.trackList)
    }

    fetchTrackId();
    fetchRecommendedTrack();
  }, []);


  const fetchTrackId = () => {
    fetch("/api/local/find/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(" Response find : ", data);
        setSelectedTrack(data);
        getImage(data);
      });
  };

  const getImage = (trackName) => {
    spotifyUtilityInstance
      .getSpotifyInstance()
      .searchTracks(trackName, { limit: 1 })
      .then((data) => {
        if (data && data.tracks) {
          setImage(data.tracks.items[0].album.images[0].url);
        } else {
          return "/default_music.png";
        }
      })
      .catch((error) => {
        return "/default_music.png";
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
    if (mode == "list-mode") {
      if (isAddedToPlaylist(item)) {
        setTracksAddToPlaylist(
          tracksAddToPlaylist.filter((track) => track.track_id != item.track_id)
        );
      } else {
        const newItem = Object.assign(item);
        newItem["mode"] = "playlist-mode";
        const newTracksList = JSON.parse(JSON.stringify(tracksAddToPlaylist));
        newTracksList.push(newItem);
        setTracksAddToPlaylist(newTracksList);
      }
    } else {
      setTracksAddToPlaylist(
        tracksAddToPlaylist.filter((track) => track.track_id != item.track_id)
      );
    }
      savePlaylist(playlistName, tracksAddToPlaylist);
  };

  return (
    <Flex
      direction={"row"}
      width="100%"
      p={8}
      paddingLeft={"2rem"}
      maxH={"container.md"}
      h={"container.md"}
    >
      <Flex flex={6} direction={"column"} marginRight={6}>
        <Box alignItems={"center"}>
          <Flex direction={"column"} mt={6} gap={"6"}>
            <Heading size={"lg"}>Result</Heading>

            <Flex gap={"4"}>
              <Image
                maxW={100}
                maxh={100}
                src={image || "/default_music.png"}
              />

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
          <Flex direction={'row'} justifyContent={'space-between'}>

          <Heading>You Might Also Like</Heading>
          <Flex direction={'row'} gap={4} mr={'8'}>
          <Tooltip label='Regenerate Recommendation'>
          <Button onClick={fetchRecommendedTrack}>
            <Icon as={IoRefreshCircle} fontSize={'2xl'}/> 
          </Button>
                </Tooltip>
                <Tooltip label='Add All songs'>
                <Button>
            <Icon as={MdOutlinePlaylistAdd} fontSize={'2xl'}/> 
          </Button>
                </Tooltip>

          </Flex>
          </Flex>
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
                  artist={item["artist"].split(";").length > 2 ? item["artist"].split(";")[0] + " et al." : item["artist"]}
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
          fontSize={"2.2rem"}
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
                Added tracks will appear here.
              </Text>{" "}
            </Flex>
          )}
        </List>
        <Button
          flex={1}
          bg={"#1DB954"}
          w={"md"}
          isLoading={isPLaylistCreating}
          height={"16"}
          maxH={"16"}
          loadingText="Creating Playlist"
          variant="solid"
          alignItems={"center"}
          mt={6}
          onClick={createPlaylist}
          disabled={playlistName.length == 0 || tracksAddToPlaylist.length == 0}
          isDisabled={
            playlistName.length == 0 || tracksAddToPlaylist.length == 0
          }
        >
          Create Playlist
        </Button>

        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          bg={useColorModeValue("#D3D3D3", "#212121")}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent bg={useColorModeValue("#D3D3D3", "#212121")}>
            <ModalHeader>Success!</ModalHeader>
            <ModalCloseButton />
            <ModalBody color={useColorModeValue("#000", "#fff")}>
              Your playlist has been created.
              Enjoy your AI-driven listening experience!
            </ModalBody>
            <ModalFooter>
              <Button bg="#1DB954" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* <LoginWarningModel 
        onClose={onClose}
        isOpen={isOpen}
        ></LoginWarningModel> */}
      </Flex>
    </Flex>
  );
};

export default Recommendation;
