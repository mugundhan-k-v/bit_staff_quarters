import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FacultyProvider, FacultyContext } from './context/FacultyContext';
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
import UpdateComplaintPage from './pages/admin/updatecomplaint';
import AdminAnnouncementPage from './pages/admin/AdminAnnouncementPage';
import AddUserPage from './pages/admin/AddUserPage'; // Import the new page

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(FacultyContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <FacultyProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/homepage" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/inmatedetails" element={<ProtectedRoute element={<InmateDetailsPage />} />} />
            <Route path="/addinmate" element={<ProtectedRoute element={<AddInmatePage />} />} />
            <Route path="/guestdetails" element={<ProtectedRoute element={<GuestDetailsPage />} />} />
            <Route path="/addguest" element={<ProtectedRoute element={<AddGuestPage />} />} />
            <Route path="/complaints" element={<ProtectedRoute element={<ComplaintsPage />} />} />
            <Route path="/addcomplaint" element={<ProtectedRoute element={<AddComplaintPage />} />} />
            <Route path="/inmatecheckin" element={<ProtectedRoute element={<InmateCheckinPage />} />} />
            <Route path="/addcheckin" element={<ProtectedRoute element={<AddCheckinPage />} />} />
            <Route path="/announcement" element={<ProtectedRoute element={<AnnouncementPage />} />} />
            <Route path="/Adminhomepage" element={<ProtectedRoute element={<AdminHomePage />} />} />
            <Route path="/Adminprofile" element={<ProtectedRoute element={<AdminProfilePage />} />} />
            <Route path="/Admininmatedetails" element={<ProtectedRoute element={<AdminInmateDetailsPage />} />} />
            <Route path="/Adminguestdetails" element={<ProtectedRoute element={<AdminGuestDetailsPage />} />} />
            <Route path="/Admincomplaints" element={<ProtectedRoute element={<AdminComplaintsPage />} />} />
            <Route path="/updatecomplaint" element={<ProtectedRoute element={<UpdateComplaintPage />} />} />
            <Route path="/adminannouncement" element={<ProtectedRoute element={<AdminAnnouncementPage />} />} />
            <Route path="/adduser" element={<ProtectedRoute element={<AddUserPage />} />} /> {/* Add the new route */}
          </Routes>
        </div>
      </Router>
    </FacultyProvider>
  );
}

export default App;