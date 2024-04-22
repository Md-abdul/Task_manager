

import {
  Box,
  Flex,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  Center,
  Spinner,
  // Text//
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../Redux/Task/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditTask = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:9090/tasks/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTask(_id, task));

      nevigate("/tasklist");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToastClose = () => {
    toast.success("Task updated successfully");
    nevigate("/tasklist");
  };

  if (!task) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Flex align="center" justify="center" style={{backgroundColor:'#e7feff'}} py={9} >
      <Box p="10" borderWidth="1px" borderRadius="md" py={10} w={"30rem"} mt={7} backgroundColor={"#a6dce0"}>
        
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              placeholder="Due Date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Priority</FormLabel>
            <Select
              placeholder="Select Priority"
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Status</FormLabel>
            <Select
              placeholder="Select Status"
              name="status"
              value={task.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Update Task
          </Button>
        </form>
        <ToastContainer onClose={handleToastClose} />
      </Box>
    </Flex>
  );
};
