import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FacultyProvider, FacultyContext } from './context/FacultyContext';
//import axios from './axiosConfig';

// Importing all the pages
import HomePage from './pages/user/HomePage';
import ProfilePage from './pages/user/userprofile';
import InmateDetailsPage from './pages/user/inmatedetails';
import AddInmatePage from './pages/user/addinmate';
import GuestDetailsPage from './pages/user/guestdetails';
import AddGuestPage from './pages/user/addguests';
import ComplaintsPage from './pages/user/complaints';
import AddComplaintPage from './pages/user/addcomplaint';
import InmateCheckinPage from './pages/user/inmatecheckin';
import AddCheckinPage from './pages/user/addcheckin';
import LoginPage from './pages/auth/login';
import AnnouncementPage from './pages/user/AnnouncementPage';
import AdminHomePage from './pages/admin/adminHomePage';
import AdminProfilePage from './pages/admin/adminprofile';
import AdminInmateDetailsPage from './pages/admin/admininmatedetails';
import AdminGuestDetailsPage from './pages/admin/adminguestdetails';
import AdminComplaintsPage from './pages/admin/admincomplaints';
import AdminAnnouncementPage from './pages/admin/AdminAnnouncementPage';
import AddUserPage from './pages/admin/AddUserPage';

const SESSION_DURATION = 0.25 * 60 * 60 * 1000; // 3 hours in milliseconds

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(FacultyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      setLoading(false);
      return isAuth;
    };
    checkAuthentication();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Check authentication from context and local storage
  return isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? element : <Navigate to="/" />;
};

// Main App Component
function App() {
  const { setIsAuthenticated, setFacultyId } = useContext(FacultyContext);

  useEffect(() => {
    const checkSession = () => {
      const savedFacultyId = localStorage.getItem('facultyId');
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const loginTime = localStorage.getItem('loginTime');

      if (savedFacultyId && isAuthenticated) {
        const currentTime = new Date().getTime();
        const sessionDuration = currentTime - loginTime;

        if (sessionDuration < SESSION_DURATION) {
          setFacultyId(savedFacultyId);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('facultyId');
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('loginTime');
          localStorage.removeItem('sessionExpiryTime');
          localStorage.removeItem('userRole'); // Clear user role on session expiration
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, [setIsAuthenticated, setFacultyId]);

  // Redirect based on user role if already authenticated
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      if (userRole === 'faculty') {
        window.location.href = '/homepage'; // Redirect to faculty homepage
      } else if (userRole === 'admin') {
        window.location.href = '/adminhomepage'; // Redirect to admin homepage
      }
    }
  }, []);

  return (
    <FacultyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/inmatedetails" element={<ProtectedRoute element={<InmateDetailsPage />} />} />
          <Route path="/addinmate" element={<ProtectedRoute element={<AddInmatePage />} />} />
          <Route path="/guestdetails" element={<ProtectedRoute element={<GuestDetailsPage />} />} />
          <Route path="/addguests" element={<ProtectedRoute element={<AddGuestPage />} />} />
          <Route path="/complaints" element={<ProtectedRoute element={<ComplaintsPage />} />} />
          <Route path="/addcomplaint" element={<ProtectedRoute element={<AddComplaintPage />} />} />
          <Route path="/inmatecheckin" element={<ProtectedRoute element={<InmateCheckinPage />} />} />
          <Route path="/addcheckin" element={<ProtectedRoute element={<AddCheckinPage />} />} />
          <Route path="/adminhomepage" element={<ProtectedRoute element={<AdminHomePage />} />} />
          <Route path="/adminprofile" element={<ProtectedRoute element={<AdminProfilePage />} />} />
          <Route path="/admininmatedetails" element={<ProtectedRoute element={<AdminInmateDetailsPage />} />} />
          <Route path="/adminguestdetails" element={<ProtectedRoute element={<AdminGuestDetailsPage />} />} />
          <Route path="/admincomplaints" element={<ProtectedRoute element={<AdminComplaintsPage />} />} />
          <Route path="/adminannouncements" element={<ProtectedRoute element={<AdminAnnouncementPage />} />} />
          <Route path="/adduser" element={<ProtectedRoute element={<AddUserPage />} />} />
          <Route path="/announcement" element={<ProtectedRoute element={<AnnouncementPage />} />} />
        </Routes>
      </Router>
    </FacultyProvider>
  );
}

export default App;