// src/pages/WorkBoardDetailPage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask } from "../features/taskSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const WorkBoardDetailPage = () => {
  const { id } = useParams(); // Workboard ID
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTasks(id)); // Fetch tasks for this workboard
  }, [dispatch, id]);

  const handleTaskCreate = (e) => {
    e.preventDefault();
    dispatch(createTask({ title: newTaskTitle, workboard_id: id }));
    setNewTaskTitle("");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    // Handle reordering of tasks
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Work Board Detail
        </h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["ToDo", "In Progress", "Completed"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                      {status}
                    </h2>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                            >
                              <p className="text-lg font-semibold text-gray-800">
                                {task.title}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

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
  );
};

export default WorkBoardDetailPage;
