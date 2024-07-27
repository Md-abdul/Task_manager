import axios from "axios";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import LoadingComponent from "../Components/Spinner";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchTasks(token);
    }
    setLoading(false);
  }, []);

  const fetchTasks = async (token) => {
    setTaskLoading(true);
    try {
      const response = await axios.get("http://localhost:9090/task/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setTaskLoading(false);
    }
  };

  // const login = (token) => {
  //   localStorage.setItem("token", token);
  //   setIsAuthenticated(true);
  //   fetchTasks(token);
  // };

  const login = (token, name, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setIsAuthenticated(true);
    fetchTasks(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setTasks([]);
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTaskLoading(true);
      try {
        await axios.delete(`http://localhost:9090/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } catch (err) {
        console.error("Error deleting task:", err);
      } finally {
        setTaskLoading(false);
      }
    }
  };

  const editTask = async (taskId, updatedTask) => {
    setTaskLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:9090/task/update/${taskId}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (err) {
      console.error("Error editing task:", err);
    } finally {
      setTaskLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setTaskLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:9090/task/createtask",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setTaskLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        tasks,
        deleteTask,
        editTask,
        createTask,
      }}
    >
      {taskLoading ? <LoadingComponent /> : children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
