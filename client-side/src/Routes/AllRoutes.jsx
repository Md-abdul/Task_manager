import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../Pages/Dashboard";
import PrivateRoute from "../Components/PrivateRoute";
import AllTask from "../Pages/AllTask";
import TaskForm from "../Pages/TaskForm";
import AdminLogin from "../Pages/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/alltask" element={<AllTask/>}/>
      <Route path="/taskform" element={<TaskForm/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
    </Routes>
  );
};

export default AllRoutes;
