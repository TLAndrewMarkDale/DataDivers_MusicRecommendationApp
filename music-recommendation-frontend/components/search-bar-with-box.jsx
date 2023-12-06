import { useState } from "react";
import { Input, Box, InputGroup, InputLeftElement, Divider, Flex,   useColorModeValue, } from "@chakra-ui/react";
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

  const searchBarInputBox = {
      bg: useColorModeValue('#D3D3D3', '#212121'),
      border:'1px',
      borderColor:useColorModeValue('#808080', '#646464'),
      position: 'relative',
      borderRadius:'3xl',
      height:'16'
}

  return (
    <Box __css={searchBarInputBox}
    >
      <InputGroup w="100%" border={'0px'} height='100%' _focusVisible={{outline: 'none'}}>
        <InputLeftElement pointerEvents={"none"} height='100%' border={'0px'} outline={'none'} marginLeft={'5'} fontSize={'xl'}>
          <SearchIcon color={useColorModeValue('#808080', '#646464')} />
        </InputLeftElement>
        <Input border={'0px'}
        _focusVisible={{outline: 'none'}}
        height='100%'
        marginLeft={'8  '}
          type={"search"}
          color={useColorModeValue('#000', '#fff')}
          fontSize={'xl'}
          placeholder="Search Songs"
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
          border={"0px"}
          borderStyle={"solid"}
          borderColor={useColorModeValue('#808080', '#646464')}          
          rounded={"lg"}
          width="100%"
          maxHeight={'xl'}
          overflowY={'scroll'}
          mt={4}
          zIndex={9}
          bg={useColorModeValue('#D3D3D3', '#212121')}          
          boxShadow="md"
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
          {searchResult.map((result) => (
            <Flex direction={'column'} gap={'2'} key={result.track_id}>
            <Box
              key={result.track_id}
              p={2}
              cursor={"pointer"}
              fontWeight={'bold'}
              color={useColorModeValue('#000', '#fff')}
              onClick={handleItemClick(result)}
            >
              {result.track}
            </Box>
            <Divider borderColor={useColorModeValue('#808080', '#fff')}/>
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
