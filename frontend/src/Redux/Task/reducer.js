import {
    SINGLE_TASK,
  TASK_DELETE,
  TASK_ERROR,
  TASK_GET,
  TASK_POST,
  TASK_REQUEST,
  TASK_UPDATE,
} from "./actionType";

const initalState = {
  TaskData: [],
  isLoading: false,
  isError: false,
  singleTask: null, 
};

export const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case TASK_REQUEST: {
      return { ...state, isLoading: true };
    }
    case TASK_GET: {
      return {
        ...state,
        TaskData: payload,
        isLoading: false,
        isError: false
      };
    }
    case TASK_ERROR: {
      return { ...state, isLoading: false, isError: true };
    }
    case TASK_DELETE: {
      return {
        ...state,
        isLoading: false,
        payload: [...state.TaskData],
      };
    }
    case TASK_POST: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        TaskData: [...state.TaskData, payload],
      };
    }
    case TASK_UPDATE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SINGLE_TASK: {
        return {
          ...state,
          singleTask: payload,
        };
      }
    default: {
      return state;
    }
  }
};
