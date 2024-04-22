
import { Box, Button, Center, Text, Image, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = () => {

  const { isAuth } = useSelector((store) => ({
    isAuth: store.authReduer.isAuth
  }));

  return (
    <Center>
      <Box w="90%" >
        <Image
          w="100%"
          h="85vh"
          mt={5}
          borderRadius={10}
          src="https://img.freepik.com/free-photo/time-action-change-concept_53876-123722.jpg?t=st=1713591378~exp=1713594978~hmac=2a1be7f6b9ef422564e1ae6e72e7de96c12fb191ead856401fb119b9943a98e5&w=996"
        />
        <Flex justify="center" mt={15} gap={10} mb={10}>
          <Center>
            <Image borderRadius={10} src="https://projectsly.com/images/task-management-system-screenshot-1.png?v=1691124479409199525" />
          </Center>
          <Center bg="fire" >
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="black" mb={6}>
                Project management on your terms,
                <br />
                <Text fontSize="3xl">#successguaranteed</Text>
               
              </Text>

              {isAuth ? (<Link to="/tasklist">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size="lg"
                  fontWeight="bold"
                >
                  Task List
                </Button>
              </Link>) : (<Link to="/login">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size="lg"
                  fontWeight="bold"
                >
                  Login
                </Button>
              </Link>)}
              
            </Box>
          </Center>
        </Flex>
      </Box>
      {/* <Footer/> */}
    </Center>
  );
};
