import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const AllTask = () => {
  const { tasks, deleteTask, editTask } = useContext(AuthContext);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleDelete = () => {
    if (currentTask) {
      deleteTask(currentTask._id);
      setIsDeleteDialogOpen(false);
      setCurrentTask(null);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (currentTask) {
      editTask(currentTask._id, currentTask);
      setIsEditDialogOpen(false);
      setCurrentTask(null);
    }
  };

  return (
    <div className="p-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500">
          No tasks available. Please create a new task.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-clip-border rounded-xl bg-gradient-to-tr from-gray-700 to-gray-500 text-white shadow-gray-900/20 p-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white-800 dark:text-gray-200">
                  {task.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 text-3xl"
                    onClick={() => {
                      setCurrentTask(task);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-3xl"
                    onClick={() => {
                      setCurrentTask(task);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
              <p className="mt-5 text-white-600 dark:text-white-400">
                {task.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span
                  className={`text-xl text-bold font-medium ${
                    task.priority === "high" ? "text-red-600" : "text-white-500"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
                <span className="text-sm text-white-500 dark:text-white-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red">Delete Task</h2>
            <p className="mt-4">Are you sure you want to delete this task?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditDialogOpen && currentTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">Edit Task</h2>
            <form className="space-y-4" onSubmit={handleEdit}>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={currentTask.title}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full p-2 border rounded-md"
                value={currentTask.description}
                onChange={(e) =>
                  setCurrentTask({
                    ...currentTask,
                    description: e.target.value,
                  })
                }
                required
              ></textarea>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={currentTask.dueDate}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, dueDate: e.target.value })
                }
                required
              />
              <select
                className="w-full p-2 border rounded-md"
                value={currentTask.priority}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, priority: e.target.value })
                }
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                className="w-full p-2 border rounded-md"
                value={currentTask.status}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, status: e.target.value })
                }
                required
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;
