
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask } from "../features/taskSlice";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = {
  TASK: "TASK",
};

const WorkBoardDetailPage = () => {
  const { id } = useParams(); // Workboard ID
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [status, setStatus] = useState("ToDo"); // Add status

  useEffect(() => {
    dispatch(fetchTasks(id)); // Fetch tasks for this workboard
  }, [dispatch, id]);

  const handleTaskCreate = (e) => {
    e.preventDefault();
    dispatch(createTask({ title: newTaskTitle, workboard: id,status:status,order:'1' }));
    setNewTaskTitle("");
  };

  const moveTask = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    // You can dispatch an action to update the order in your redux state if needed
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error}</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Work Board Detail
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["ToDo", "In Progress", "Completed"].map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
                moveTask={moveTask}
              />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Task
            </h2>
            <form
              onSubmit={handleTaskCreate}
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="New Task"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ToDo">ToDo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default WorkBoardDetailPage;

// TaskColumn component handles each status column
// Task component handles the drag-and-drop logic for individual tasks
const Task = ({ task, index, moveTask }) => {
  const ref = useDragDropItem(task, index, moveTask);
  return (
    <div
      ref={ref}
      className="mb-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
    >
      <p className="text-lg font-semibold text-gray-800">{task.title}</p>
    </div>
  );
};
const TaskColumn = ({ status, tasks, moveTask }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">{status}</h2>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} moveTask={moveTask} />
      ))}
    </div>
  );
};

// Custom hook to useDrag and useDrop for each task
const useDragDropItem = (task, index, moveTask) => {
  const [, drag] = useDrag({
    type: ItemType.TASK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.TASK,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (el) => drag(drop(el));
};
