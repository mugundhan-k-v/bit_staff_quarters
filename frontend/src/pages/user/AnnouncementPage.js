import React, { useState, useEffect } from 'react';
import PageLayout from '../../component/userPageLayout';
import '../../css/user/AnnouncementPage.css';

const AnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/announcements')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched announcements:', data); // Debugging line
                setAnnouncements(data);
            })
            .catch(error => {
                console.error('Error fetching announcements:', error); // Debugging line
            });
    }, []);

    return (
        <PageLayout>
            <div className="announcement-container">
                <h1 className="announcement-title">Community Announcements</h1>
                <p className="announcement-description">Stay updated with the latest community news and announcements.</p>
                <div className="message-box">
                    {announcements.map(announcement => (
                        <div key={announcement._id} className="message">
                            <h3>{announcement.title}</h3>
                            <p>{announcement.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default AnnouncementPage;