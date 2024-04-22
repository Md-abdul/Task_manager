import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Spinner, Center } from "@chakra-ui/react";

export const SingleTaskView = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { _id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://task-mamagment-backend.onrender.com/tasks/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [_id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="81vh"
      backgroundColor="#deddd9"
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="10"
        boxShadow="md"
        maxW="400px"
        textAlign="center"
        backgroundColor="#76cefb"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="#1a202c">
          Task Details
        </Text>
        <Text fontSize="lg" color="#1a202c" mb="2">
          <b>Title:</b> {task?.title}
        </Text>
        <Text fontSize="lg" color="#1a202c" mb="2">
          <b>Description:</b> {task?.description}
        </Text>
        <Text fontSize="lg" color="#1a202c" mb="2">
          <b>Due Date:</b> {new Date(task?.dueDate).toLocaleDateString()}
        </Text>
        <Text fontSize="lg" color="#1a202c" mb="2">
          <b>Priority:</b> {task?.priority}
        </Text>
        <Text fontSize="lg" color="#1a202c" mb="2">
          <b>Status:</b> {task?.status}
        </Text>
      </Box>
    </Box>
  );
};
