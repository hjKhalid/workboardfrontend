// src/pages/WorkBoardsPage.js
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkBoards, createWorkBoard } from '../features/workBoardSlice';
import { Link } from 'react-router-dom';

const WorkBoardsPage = () => {
  const dispatch = useDispatch();
  const { workBoards, loading } = useSelector((state) => state.workBoard);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchWorkBoards());
  }, [dispatch]);

  const handleCreateWorkBoard = (e) => {
    e.preventDefault();
    dispatch(createWorkBoard({ title, description }));
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Work Boards</h1>
        </div>

        {/* Display WorkBoards */}
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workBoards?.map((board) => (
              <div
                key={board.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold text-gray-800">{board.title}</h3>
                <p className="text-gray-600 mt-2">{board.description}</p>
                <Link
                  to={`/workboard/${board.id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  View Board
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Create WorkBoard Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Work Board</h2>
          <form onSubmit={handleCreateWorkBoard} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Board Title</label>
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
              <label className="block text-sm font-medium text-gray-700">Description</label>
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
