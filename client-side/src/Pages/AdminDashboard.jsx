import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [adminlogut, setAdminlogout] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9090/admin/all-tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9090/admin/all-users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handelAdminLogout = () => {
    setAdminlogout(true);
    navigate("/");
    console.log(adminlogut);
  };

  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-200">
      <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <h1 className="text-3xl text-bold ml-10 text-black">WELCOME !!</h1>

        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full shadow-2xl cursor-pointer"
            style={{ border: "2px solid red" }}
            src="https://api.brusselstimes.com/wp-content/uploads/2019/05/vddriessche-c-stamp-media.jpg"
            alt="avatar"
          />
          <h4 className="mx-2 mt-2 font-medium text-black dark:text-gray-200">
            Admin
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-black dark:text-gray-400">
            admin@gmail.com
          </p>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-200">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">All Task</span>
            </Link>
            <Link className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-5">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">All User</span>
            </Link>
          </nav>

          <div className="ml-2">
            <button
              className="flex items-center bg-red-500 hover:bg-red-400 text-white px-10 py-4 rounded-lg focus:outline-none"
              onClick={handelAdminLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 w-full p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-5">All Task</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Due Date: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t border-gray-800 my-4 mt-20" />
        <h1 className="text-3xl font-bold mt-10 mb-10">All Task</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full shadow-xl cursor-pointer"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              <h2 className="text-xl font-bold text-gray-800 ml-5">
                {user.name}
              </h2>
              <p className="text-gray-600 ml-5">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
