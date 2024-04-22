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
import { signIn } from "../Redux/User/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signIn(formData));
      toast.success("Login successful!", {
        onClose: () => navigate("/tasklist"),
      });
      setFormData({ email: "", pass: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleToastClose = () => {
    navigate("/tasklist");
    toast.success("Login successful!");
  };

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="space-between">
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
            <Heading color="teal.400">Welcome! Back SignIn</Heading>
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
                        type={showPassword ? "text" : "password"}
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
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
            <Box>
              New to us?{" "}
              <Link color="teal.500" href="/signup">
                Sign Up
              </Link>
            </Box>
          </Stack>
        </Box>
      </Flex>
      <ToastContainer onClose={handleToastClose} />
    </Flex>
  );
};
