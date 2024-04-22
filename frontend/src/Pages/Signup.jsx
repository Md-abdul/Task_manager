import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { register } from "../Redux/User/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData));
      // toast.success("Registration successful!");
      toast.success("Registration successful!", {
        onClose: () => navigate("/login"),
      });
      setFormData({ name: "", email: "", pass: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="space-between" >
        <Box>
          <Image
            width={"80%"}
            src="https://img.freepik.com/free-vector/appointment-booking-mobile_23-2148570787.jpg?t=st=1713463301~exp=1713466901~hmac=edde80d5d4c524ba3f54a7d9e7d159b4671785666de656bfc0a522fb5339a8d2&w=740"
            alt=""
          />
        </Box>
        <Spacer />
        <Box w={"50%"} py={5}>
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Welcome! Signup</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={handleSubmit}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <AiOutlineUser />
                      </InputLeftElement>
                      <Input
                        type="name"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <AiOutlineUser />
                      </InputLeftElement>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <AiOutlineLock />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? "text" : "pass"}
                        placeholder="Password"
                        name="pass"
                        value={formData.pass}
                        onChange={handleInputChange}
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      <Link>Forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </Box>
            <Box>
              Already have an account?{" "}
              <Link color="teal.500" href="/login">
                Sign In
              </Link>
            </Box>
          </Stack>
        </Box>
      </Flex>
      <ToastContainer />
    </Flex>
  );
};
