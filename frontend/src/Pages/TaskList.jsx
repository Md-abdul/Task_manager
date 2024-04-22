

import { Box,  Button,  Center,  Grid, Icon,  } from "@chakra-ui/react";
import TaskCart from "./TaskCart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Redux/Task/action";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const TaskList = () => {
  const { tasks, loading } = useSelector((store) => ({
    tasks: store.taskReducer.TaskData,
    loading: store.taskReducer.isLoading,
    error: store.taskReducer.isError,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Center>
      <Box mt={5} w={"80rem"} h={"79.5vh"}>
        {/* <Flex> */}
          <Link to="/addtask">
            <Button colorScheme="teal" variant="solid" ml={5}>
              <Icon as={IoAdd} fontWeight="bold" mr={2} variant="solid" /> Add
              New Tasks
            </Button>
          </Link>
          {/* <AddTask/> */}

          {loading ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={5} mx={5}>
              {Array.isArray(tasks) &&
                tasks.length > 0 &&
                tasks.map((task) => (
                  <TaskCart
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    priority={task.priority}
                    status={task.status}
                  />
                ))}
            </Grid>
          )}
        {/* </Flex> */}
      </Box>
    </Center>
  );
};

export default TaskList;
