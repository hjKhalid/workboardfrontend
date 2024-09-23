import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkBoards,
  createWorkBoard,
  deleteWorkBoard,
} from "../features/workBoardSlice";
import { Link } from "react-router-dom";

const WorkBoardsPage = () => {
  const dispatch = useDispatch();
  const { workBoards, loading, error } = useSelector(
    (state) => state.workBoard
  );
  console.log(workBoards);
  const userName = localStorage.getItem(`userName`);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(fetchWorkBoards());
  }, [dispatch]);

  const handleCreateWorkBoard = (e) => {
    e.preventDefault();
    dispatch(createWorkBoard({ title, description }));
    setTitle("");
    setDescription("");
  };
  const handleOnClick = (id) => {
    console.log("it clicks");

    dispatch(deleteWorkBoard(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="bg-white shadow-md py-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Work Boards</h1>
          {userName && (
            <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-full font-semibold">
              <span className="text-sm">Welcome, {userName}!</span>
            </div>
          )}
        </div>
      </header>
      <div className="container mx-auto">
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Work Boards</h1>
        </div> */}

        {/* Header with user name */}

        {/* Handle Loading, Error, and Empty State */}
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && (
          <p className="text-red-600">
            Error fetching workboards: {error.message}
          </p>
        )}
        {!loading && workBoards?.length === 0 && (
          <p className="text-gray-600">
            No Work Boards available. Create a new one!
          </p>
        )}

        {/* Display WorkBoards */}
        {!loading && workBoards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workBoards ? (
              workBoards.map((board) => (
                <div
                  key={board.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {board.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{board.description}</p>
                  <Link
                    to={`/workboard/${board.id}`}
                    className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                  >
                    View Board
                  </Link>
                  <button className="ml-5" onClick={handleOnClick(board.id)}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>hi</p>
            )}
          </div>
        )}

        {/* Create WorkBoard Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create a New Work Board
          </h2>
          <form
            onSubmit={handleCreateWorkBoard}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Board Title
              </label>
              <input
                type="text"
                placeholder="Enter board title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Create Work Board
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkBoardsPage;
