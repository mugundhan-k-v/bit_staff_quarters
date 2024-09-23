import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import ProfilePage from './pages/user/profile';
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
    const inmatesData = [
        {
          name: 'John Doe',
          relation: 'Son',
          age: 22,
          aadharNo: '1234-5678-9012',
          working: 'Yes',
          employer: 'Company ABC',
          facultyId: 'FAC123'
        },
        {
          name: 'Jane Doe',
          relation: 'Daughter',
          age: 19,
          aadharNo: '9876-5432-1098',
          working: 'No',
          employer: '',
          facultyId: 'FAC456'
        },
        {
          name: 'Richard Roe',
          relation: 'Father',
          age: 50,
          aadharNo: '2234-5678-9012',
          working: 'Yes',
          employer: 'XYZ Corp',
          facultyId: 'FAC789'
        }
    ];

    // Sample data for guests
    const guestsData = [
        {
            guests: 2,
            from: 'Namakkal',
            checkIn: '2024-08-20',
            checkOut: '2024-08-25',
            facultyId: 'FAC12345',
            code: 'GUEST001'
        },
        {
            guests: 3,
            from: 'Erode',
            checkIn: '2024-08-18',
            checkOut: '2024-08-22',
            facultyId: 'FAC67890', 
            code: 'GUEST002'
        },
        {
            guests: 1,
            from: 'Salem',
            checkIn: '2024-08-19',
            checkOut: '2024-08-20',
            facultyId: 'FAC54321',
            code: 'GUEST003'
        },
        {
            guests: 1,
            from: 'Salem',
            checkIn: '2024-08-20',
            checkOut: '2024-08-24',
            facultyId: 'FAC54321',
            code: 'GUEST004'
        }
    ];

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/Adminhomepage" element={<AdminHomePage />} />
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
                    <Route path="/announcement" element={<AnnouncementPage />} />
                    <Route path="/Adminprofile" element={<AdminProfilePage />} />
                    <Route path="/Admininmatedetails" element={<AdminInmateDetailsPage inmates={inmatesData} />} /> 
                    <Route path="/Adminguestdetails" element={<AdminGuestDetailsPage guests={guestsData} />} />
                    <Route path="/Admincomplaints" element={<AdminComplaintsPage />} />
                    <Route path="/updatecomplaint" element={<UpdateComplaintPage />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
