import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/Task/action";
import {
  Box,
  Center,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { GiNotebook } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const AddTask = () => {
  const dispatch = useDispatch();
 const nevigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(addTask(formData)); 
      toast.success("Task added successfully!"); 
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "pending",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToastClose = () => {
    nevigate("/tasklist")
  };

  return (
    <Center style={{backgroundColor:'#e7feff'}} py={9}>
      <Box
        w={"30rem"}
        borderWidth="1px"
        borderRadius="lg"
        p="10"
        boxShadow="lg"
       mt={8}
       backgroundColor={"#a6dce0"}
       h={"69vh"}
      >
        <VStack spacing="4">
          <Center>
            <Flex alignItems="center">
              <GiNotebook style={{ marginRight: "8px",fontSize: "40px"  }} />
              <Heading as="h2" size="lg">
                Add Task
              </Heading>
            </Flex>
          </Center>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                backgroundColor={"#d5e5eb"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                backgroundColor={"#d5e5eb"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                backgroundColor={"#d5e5eb"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                backgroundColor={"#d5e5eb"}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                backgroundColor={"#d5e5eb"}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="teal" mt={5}>
              Add Task
            </Button>
          </form>
        </VStack>
      </Box>
      <ToastContainer onClose={handleToastClose} /> 
    </Center>
  );
};
