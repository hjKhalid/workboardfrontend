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
    <div>
      <h1>Work Boards</h1>
      {loading && <p>Loading...</p>}
      {workBoards?.map((board) => (
        <div key={board.id}>
          <Link to={`/workboard/${board.id}`}>{board.title}</Link>
        </div>
      ))}

      <form onSubmit={handleCreateWorkBoard}>
        <div>
          <input
            type="text"
            placeholder="Work Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Work Board</button>
      </form>
    </div>
  );
};

export default WorkBoardsPage;
