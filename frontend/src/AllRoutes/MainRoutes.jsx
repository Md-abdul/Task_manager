import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { Home } from "../Pages/Home";
import TaskList from "../Pages/TaskList";
import { SingleTaskView } from "../Pages/SingleTaskView";
import { EditTask } from "../Pages/EditTask";
import { AddTask } from "../Pages/AddTask";
import { PrivateRoutes } from "./PrivateRoutes";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasklist"
          element={
            <PrivateRoutes>
              <TaskList />
            </PrivateRoutes>
          }
        />
        <Route path="/singletaskview/:_id" element={<SingleTaskView />} />
        <Route path="/edittask/:_id" element={<EditTask />} />
        <Route path="/addtask" element={<AddTask/>}/>

      </Routes>
    </>
  );
};
