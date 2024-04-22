
import {
  Box,
  Text,
  IconButton,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTasks } from '../Redux/Task/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progressbar } from './Progressbar';

const TaskCard = ({ id, title, priority, status }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(id))
      .then(() => {
        toast.success('Task deleted successfully');
        dispatch(fetchTasks());
      })
      .catch(() => {
        toast.error('Error deleting task');
      });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      mb="4"
      boxShadow="md"
      w={"25rem"}
      backgroundColor={'#a6dce0'}
    >
      <Button colorScheme={priority === 'high' ? 'red' : priority === 'medium' ? 'yellow' : 'green'} size="sm">
          {priority}
        </Button>
      <Text fontSize="xl" fontWeight="bold" mb="2" mt={3}>
        {title}
      </Text>
      <HStack spacing={2} mb={2}>
        <Text fontSize="sm" color="gray.600">
          Status: {status}
        </Text>
        
      </HStack>

       <HStack>
        <Text fontSize="sm">Progress:</Text>
        <Box w="200%"> 
          <Progressbar />
        </Box>
      </HStack>
      
      <HStack spacing={4} mt={5}>
        <Link to={`/edittask/${id}`}>
          <IconButton aria-label="Edit" icon={<AiOutlineEdit />} colorScheme="blue" />
        </Link>
        <Link to={`/singletaskview/${id}`}>
          <IconButton aria-label="View" icon={<AiOutlineEye />} colorScheme="green" />
        </Link>
        <Popover>
          <PopoverTrigger>
            <IconButton aria-label="Delete" icon={<AiOutlineDelete />} colorScheme="red" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Confirm Deletion</PopoverHeader>
            <PopoverBody>
              Are you sure you want to delete this task?
              <Button colorScheme="red" ml="2" onClick={handleDelete}>
                Delete
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <ToastContainer />
    </Box>
  );
};

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
  status: PropTypes.oneOf(['pending', 'completed']),
};

export default TaskCard;


