
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import FarmerDashboard from './pages/Farmer/FarmerDashboard';
import ProcessorDashboard from './pages/Processor/ProcessorDashboard';
import Profile from './pages/Profile/Profile';

function ProtectedRoute({ children, role }: { children: React.ReactNode, role: 'farmer' | 'processor' }) {
  const currentRole = localStorage.getItem('userRole');
  // If no role is set, allow it to render (the login page will set it, but React Router evaluates immediately)
  // or if the role matches, allow it.
  if (currentRole && currentRole !== role) {
    return <Navigate to={currentRole === 'processor' ? '/catalogo' : '/farmer'} replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Mock) */}
        <Route path="/farmer" element={
          <ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>
        } />
        <Route path="/catalogo" element={
          <ProtectedRoute role="processor"><ProcessorDashboard /></ProtectedRoute>
        } />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
