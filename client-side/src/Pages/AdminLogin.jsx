
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = () => {
    if (username === "admin@gmail.com" && password === "admin") {
      toast.success("Login successful!");
      navigate("/admindashboard"); 
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="absolute top-10 text-center w-full">
        <p className="text-red-600">
          Note: Use <b>admin@gmail.com</b> as the username and <b>admin</b> as
          the password to log in.
        </p>
      </div>
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="text-center text-2xl font-bold mb-4">Login</div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`bx ${
              isPasswordVisible ? "bx-show" : "bx-hide"
            } absolute right-3 top-9 cursor-pointer`}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="form-checkbox"
            />
            <label htmlFor="remember" className="ml-2 text-gray-700">
              Remember me
            </label>
          </div>
          <button className="text-blue-500 hover:underline">
            Forgot password?
          </button>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to={"/"}>
          <div className="text-center mt-4">
            <span>Employee Login</span>
            <button className="text-blue-500 hover:underline ml-1">
              Page
            </button>
          </div>
        </Link>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AdminLogin;
