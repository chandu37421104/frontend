import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Facultynavbar } from './components/Facultynavbar';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Leaderboard } from './pages/Leaderboard';
import { Rewards } from './pages/Rewards';
import { Signin } from './pages/Signin';
import { ForgotPassword } from './pages/Forgotpassword';
import { Facultydashboard } from './pages/Facultydashboard';
import { Facultytask } from './pages/Facultytask';
import { Facultyleaderboard } from './pages/Facultyleaderboard';
import { Facultyrewards } from './pages/Facultyrewards';


function AppContent() {
  const location = useLocation();

  // Array of paths where no navbar should be shown
  const noNavbarPaths = ['/signin', '/forgotpassword'];

  // Array to determine which navbar to show
  const facultyNavPaths = [
    '/facultydashboard', 
    '/facultytask', 
    '/facultyleaderboard', 
    '/facultyrewards'
  ];

  // Determine which navbar to render
  const shouldRenderFacultyNavbar = facultyNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!noNavbarPaths.includes(location.pathname) && (
        shouldRenderFacultyNavbar ? <Facultynavbar /> : <Navbar />
      )}
      
      <Routes>
        {/* Authentication Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rewards" element={<Rewards />} />

        {/* Faculty Routes */}
        <Route path="/facultydashboard" element={<Facultydashboard />} />
        <Route path="/facultytask" element={<Facultytask />} />
        <Route path="/facultyleaderboard" element={<Facultyleaderboard />} />
        <Route path="/facultyrewards" element={<Facultyrewards />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;