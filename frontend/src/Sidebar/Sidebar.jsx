// // import { Box, Link, VStack } from "@chakra-ui/react";
// // import {
// //   AiFillHome,
// //   AiOutlineInfoCircle,
// //   AiOutlineTool,
// //   AiOutlineContacts,
// // } from "react-icons/ai";

// // export const Sidebar = () => {
// //   return (
// //     <Box
// //       position="sticky"
// //       top="0"
// //       height="100vh"
// //       backgroundColor="gray.200"
// //       p={4}
// //       overflowY="auto"
// //       boxShadow="md"
// //       w={"15%"}
// //     >
// //       <VStack spacing={8} align="stretch">
// //         <Link
// //           to="/"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <AiFillHome />
// //           <Box ml={2}>Home</Box>
// //         </Link>
// //         <Link
// //           href="#"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <AiOutlineInfoCircle />
// //           <Box ml={2}>About</Box>
// //         </Link>
// //         <Link
// //           href="#"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <AiOutlineTool />
// //           <Box ml={2}>Services</Box>
// //         </Link>
// //         <Link
// //           href="#"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <AiOutlineContacts />
// //           <Box ml={2}>Contact</Box>
// //         </Link>
// //       </VStack>
// //     </Box>
// //   );
// // };





// // import { Box, Link, VStack,Text } from "@chakra-ui/react";
// // import {
// //   FaTasks,
// //   FaUserAlt,
// //   // GiProgression,
// //   // FiLogOut
// // } from "react-icons/fa";
// // import { TbLogout2 } from "react-icons/tb";
// // import { GiProgression } from "react-icons/gi";
// // export const Sidebar = () => {
// //   return (
// //     <Box
// //       position="sticky"
// //       top="0"
// //       height="100vh"
// //       backgroundColor="gray.200"
// //       p={4}
// //       overflowY="auto"
// //       boxShadow="md"
// //       w={"15%"}
// //     >
// //       <VStack spacing={8} align="stretch">
// //         <Text mt={9}>Task Managment</Text>
// //         <Link
// //           to="/tasklist"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //             boxShadow: "md",
// //             borderRadius: "md",
// //             padding: "0.5rem"
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <FaTasks />
// //           <Box ml={2}>Tasks</Box>
// //         </Link>
// //         <Link
// //           to="/profile"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //             boxShadow: "md",
// //             borderRadius: "md",
// //             padding: "0.5rem"
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <FaUserAlt />
// //           <Box ml={2}>Profile</Box>
// //         </Link>
// //         <Link
// //           to="/progress"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //             boxShadow: "md",
// //             borderRadius: "md",
// //             padding: "0.5rem"
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           <GiProgression />
// //           <Box ml={2}>Progress</Box>
// //         </Link>
// //         <Link
// //           to="/logout"
// //           _hover={{
// //             textDecoration: "none",
// //             color: "teal.600",
// //             backgroundColor: "teal.50",
// //             boxShadow: "md",
// //             borderRadius: "md",
// //             padding: "0.5rem"
// //           }}
// //           padding="0.5rem"
// //           display="flex"
// //           alignItems="center"
// //           borderRadius="md"
// //         >
// //           {/* <FiLogOut /> */}
// //           <TbLogout2/>
// //           <Box ml={2}>Logout</Box>
// //         </Link>
// //       </VStack>
// //     </Box>
// //   );
// // };





// import { Box, Link, VStack, Text, IconButton, Button } from "@chakra-ui/react";
// import { FaTasks, FaUserAlt } from "react-icons/fa";
// import { GiProgression } from "react-icons/gi";
// import { FiLogOut } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { LogoutUsers } from "../Redux/User/action";
// import { useNavigate } from "react-router-dom";

// export const Sidebar = () => {
//   const { isAuth } = useSelector((store) => ({
//     isAuth: store.authReduer.isAuth,
//   }));
//   const dispatch = useDispatch();
//   const history = useNavigate();

//   const logout = () => {
//     dispatch(LogoutUsers());
//     localStorage.removeItem("token");
//     history.push("/login");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token && isAuth) {
//       dispatch(LogoutUsers());
//     }
//   }, [dispatch, isAuth]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       dispatch({ type: "LOGIN_SUCCESS" });
//     }
//   }, [dispatch]);

//   return (
//     <Box
//       position="sticky"
//       top="0"
//       height="100vh"
//       backgroundColor="gray.200"
//       p={4}
//       overflowY="auto"
//       boxShadow="md"
//       width="20%"
//     >
//       <Box>
//         <Link to="/">
//           <Text fontSize="2xl" fontWeight="bold" color="teal.500">
//             Tasks Manager
//           </Text>
//         </Link>
//       </Box>
//       <VStack spacing={4} mt={8} align="stretch">
//         <Link
//           to="/tasklist"
//           color="gray.800"
//           _hover={{
//             color: "teal.500",
//             boxShadow: "md",
//             borderRadius: "md",
//             padding: "0.5rem",
//           }}
//           display="flex"
//           alignItems="center"
//         >
//           <FaTasks style={{ marginRight: "0.5rem" }} />
//           Tasks
//         </Link>
//         {isAuth ? (
//           <>
//             <Button
//               colorScheme="red"
//               onClick={logout}
//               _hover={{
//                 boxShadow: "md",
//                 borderRadius: "md",
//                 padding: "0.5rem",
//               }}
//               display="flex"
//               alignItems="center"
//             >
//               <FiLogOut style={{ marginRight: "0.5rem" }} />
//               Logout
//             </Button>
//             <Link
//               to="/profile"
//               color="gray.800"
//               _hover={{
//                 color: "teal.500",
//                 boxShadow: "md",
//                 borderRadius: "md",
//                 padding: "0.5rem",
//               }}
//               display="flex"
//               alignItems="center"
//             >
//               <FaUserAlt style={{ marginRight: "0.5rem" }} />
//               Profile
//             </Link>
//           </>
//         ) : (
//           <Link
//             to="/login"
//             color="gray.800"
//             _hover={{
//               color: "teal.500",
//               boxShadow: "md",
//               borderRadius: "md",
//               padding: "0.5rem",
//             }}
//             display="flex"
//             alignItems="center"
//           >
//             <FaUserAlt style={{ marginRight: "0.5rem" }} />
//             Login
//           </Link>
//         )}
//         <Link
//           to="/progress"
//           color="gray.800"
//           _hover={{
//             color: "teal.500",
//             boxShadow: "md",
//             borderRadius: "md",
//             padding: "0.5rem",
//           }}
//           display="flex"
//           alignItems="center"
//         >
//           <GiProgression style={{ marginRight: "0.5rem" }} />
//           Progress
//         </Link>
//       </VStack>
//       <IconButton
//         aria-label="Toggle Menu"
//         fontSize="24px"
//         color="gray.800"
//         _hover={{ color: "teal.500" }}
//         display={{ base: "flex", md: "none" }}
//         position="fixed"
//         top="1rem"
//         right="1rem"
//         zIndex="modal"
//       />
//     </Box>
//   );
// };
