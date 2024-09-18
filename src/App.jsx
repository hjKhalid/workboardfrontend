// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkBoardsPage from './pages/WorkBoardsPage';
import WorkBoardDetailPage from './pages/WorkBoardDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkBoardsPage />} />
        <Route path="/workboard/:id" element={<WorkBoardDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
