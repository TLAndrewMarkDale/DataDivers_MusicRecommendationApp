import { useState } from "react";
import { Input, Box, InputGroup, InputLeftElement, Divider, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar(props) {
  const { onInputChange, onItemClick, searchResult, searchTerm } = props;

  const handleItemClick = (item) => {
    return (e) => {
      if (typeof onItemClick === "function") {
        
        onItemClick(item);
      }
    };
  };

  const handleSearch = async (event) => {
    // setSearchTerm(searchTerm);

    if (typeof onInputChange === "function") {
      onInputChange(event.target.value);
    }
  };

  return (
    <Box position={"relative"} >
      <InputGroup w="100%">
        <InputLeftElement pointerEvents={"none"}>
          <SearchIcon color="gray.300" mt="2" />
        </InputLeftElement>
        <Input
          type={"search"}
          placeholder="Search Songs"
          size={"lg"}
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      {searchResult.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          p={4}
          border={"1px"}
          borderStyle={"solid"}
          borderColor={"gray.300"}
          rounded={"md"}
          width="100%"
          maxHeight={'xl'}
          overflowY={'scroll'}
          mt={4}
          zIndex={9}
          backgroundColor="white"
          boxShadow="md"
        >
          {searchResult.map((result) => (
            <Flex direction={'column'} gap={'2'} key={result.track_id}>
            <Box
              key={result.track_id}
              p={2}
              cursor={"pointer"}
              fontWeight={'bold'}
              color={'gray'}
              onClick={handleItemClick(result)}
            >
              {result.track}
            </Box>
            <Divider/>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;

// I'want to animate using chakra UI . Transtion from Home page to Result
// There is common nav bar which is in all the page

// Home page elements :
// A search bar
// A search bar result box
// Trending song cards

// Result page elements
// Search bar
// A song tile.
// A recommended song list

// What I want

// When user type something on search bar. The list suggested song should be show in search bar result box. Then user can click on anyone of the result in search bar result box. It will navigate to result page. Then transition will happen when search box will got to top of the page
