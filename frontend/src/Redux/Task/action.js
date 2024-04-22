

import axios from "axios";
import {
  SINGLE_TASK,
  TASK_DELETE,
  TASK_ERROR,
  TASK_GET,
  TASK_POST,
  TASK_REQUEST,
  TASK_UPDATE,
} from "./actionType";

const getToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: "https://task-mamagment-backend.onrender.com/", 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}` 
  }
});

export const taskRequest = () => ({
  type: TASK_REQUEST,
});

export const taskError = () => ({
  type: TASK_ERROR,
});

export const taskSuccess = (data) => ({
  type: TASK_GET,
  payload: data,
});

export const addTask = (taskData) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const response = await axiosInstance.post("/tasks/create", taskData); 
    dispatch({
      type: TASK_POST,
      payload: response.data,
    });
  } catch (error) {
    dispatch(taskError());
  }
};

export const updateTask = (taskId, task) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const response = await axiosInstance.patch(`/tasks/update/${taskId}`, task); // Use the axios instance
    dispatch({
      type: TASK_UPDATE,
      payload: response.data,
    });
  } catch (error) {
    dispatch(taskError());
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    await axiosInstance.delete(`/tasks/delete/${taskId}`); 
    dispatch({
      type: TASK_DELETE,
      payload: taskId,
    });
  } catch (error) {
    dispatch(taskError());
  }
};


// export const fetchTasks = () => async (dispatch) => {
//   dispatch(taskRequest());
//   try {
//     const response = await axiosInstance.get("/tasks/"); // Use the axios instance
//     dispatch(taskSuccess(response.data));
//   } catch (error) {
//     dispatch(taskError());
//   }
// };


export const fetchTasks = () => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const response = await axiosInstance.get("/tasks/", {

    });
    dispatch(taskSuccess(response.data));
  } catch (error) {
    dispatch(taskError());
  }
};

export const getSingleTask = (id) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);
    dispatch({
      type: SINGLE_TASK,
      payload: response.data,
    });
  } catch (error) {
    dispatch(taskError());
  }
};

