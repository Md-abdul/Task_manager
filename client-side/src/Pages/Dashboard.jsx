import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AllTask from "./AllTask";
import TaskForm from "./TaskForm";
import { AuthContext } from "../Context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);

  const userName = localStorage.getItem("userName") || "John Doe";
  const userEmail = localStorage.getItem("userEmail") || "john@example.com";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddTask = () => {
    setIsTaskFormVisible(true);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <h1 className="text-3xl text-bold ml-10 text-black">WELCOME !!</h1>

        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full shadow-xl cursor-pointer"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <h4 className="mx-2 mt-2 font-medium text-black dark:text-gray-200">
            {userName}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-black dark:text-gray-400">
            {userEmail}
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
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            <a
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
              onClick={handleAddTask}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4V20M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mx-4 font-medium">Add Task</span>
            </a>
          </nav>

          <div className=" ml-2">
            {" "}
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-400 text-white px-10 py-4 rounded-lg focus:outline-none"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 w-full">
        <div className="flex-1 p-6">
          {isTaskFormVisible ? <TaskForm /> : <AllTask />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
