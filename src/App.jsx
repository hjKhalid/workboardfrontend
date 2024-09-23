import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load the page components
const WorkBoardsPage = lazy(() => import('./pages/WorkBoardsPage'));
const WorkBoardDetailPage = lazy(() => import('./pages/WorkBoardDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));

function App() {
  return (
    <Router>
      {/* Wrap Routes with Suspense to handle lazy loading fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<WorkBoardsPage />} />
          <Route path="/workboard/:id" element={<WorkBoardDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
