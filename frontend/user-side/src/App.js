import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/profile';
import InmateDetailsPage from './pages/inmatedetails';
import AddInmatePage from './pages/addinmate';
import GuestDetailsPage from './pages/guestdetails';
import AddGuestPage from './pages/addguests';
import ComplaintsPage from './pages/complaints';
import AddComplaintPage from './pages/addcomplaint';
import InmateCheckinPage from './pages/inmatecheckin';
import AddCheckinPage from './pages/addcheckin';
import LoginPage from './pages/login';
import AnnouncementPage from './pages/AnnouncementPage'; // Import the new page

function App() {
    const [inmates, setInmates] = useState([]);
    const [guests, setGuests] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [checkinDetails, setCheckinDetails] = useState([]);

    const addInmate = (inmate) => {
        setInmates(prevInmates => [...prevInmates, inmate]);
    }

    const addGuest = (guest) => {
        setGuests(prevGuests => [...prevGuests, guest]);
    }

    const addComplaint = (complaint) => {
        setComplaints(prevComplaints => [...prevComplaints, complaint]);
    }

    const addCheckin = (checkin) => {
        setCheckinDetails(prevCheckinDetails => [...prevCheckinDetails, checkin]);
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/inmatedetails" element={<InmateDetailsPage inmates={inmates} />} />
                    <Route path="/addinmate" element={<AddInmatePage addInmate={addInmate} />} />
                    <Route path="/guestdetails" element={<GuestDetailsPage guests={guests} />} />
                    <Route path="/addguest" element={<AddGuestPage addGuest={addGuest} />} />
                    <Route path="/complaints" element={<ComplaintsPage complaints={complaints} />} />
                    <Route path="/addcomplaint" element={<AddComplaintPage addComplaint={addComplaint} />} />
                    <Route path="/inmatecheckin" element={<InmateCheckinPage checkinDetails={checkinDetails} />} />
                    <Route path="/addcheckin" element={<AddCheckinPage addCheckin={addCheckin} />} />
                    <Route path="/announcement" element={<AnnouncementPage />} /> {/* Add the new route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
