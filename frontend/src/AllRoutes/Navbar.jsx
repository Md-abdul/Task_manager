import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { IoMenu, IoClose } from "react-icons/io5";
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LogoutUsers } from "../Redux/User/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const { isAuth } = useSelector((store) => ({
    isAuth: store.authReduer.isAuth,
  }));
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();



  const logout = () => {
    dispatch(LogoutUsers());

    localStorage.removeItem('token');
    toast.success("Logout success! Thanks for visiting", {
      onClose: () => nevigate("/login")
    });
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && isAuth) {
      dispatch(LogoutUsers());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN_SUCCESS" });
    }
  }, [dispatch]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex align="center">
        <Box>
          <Link to="/">
            <Text fontSize="2xl" fontWeight="larger">
              <b>Tasks Manager</b>
            </Text>
          </Link>
        </Box>
      </Flex>

      <Spacer />

      <Flex align="center" display={{ base: "none", md: "flex" }}>
        <Link
          fontSize="6xl"
          as={Link}
          to="/tasklist"
          color="gray.800"
          _hover={{ color: "gray.900" }}
          mr="4"
        >
          Tasks
        </Link>
        {isAuth ? (
          <Button aria-label="Logout" colorScheme="red" onClick={logout} ml="4">
            Logout
          </Button>
        ) : (
          <Link
            as={Link}
            to="/login"
            color="gray.800"
            _hover={{ color: "gray.900" }}
            ml="8"
          >
            <BiUserCircle style={{ fontSize: "30px" }} />
          </Link>
        )}
      </Flex>

      <Flex align="center" display={{ base: "flex", md: "none" }}>
        <IconButton
          aria-label="Toggle Menu"
          icon={isOpen ? <IoClose /> : <IoMenu />}
          onClick={onToggle}
          fontSize="24px"
          color="gray.800"
          _hover={{ color: "gray.900" }}
        />
      </Flex>

      <ToastContainer  />
    </Flex>
  );
};


