import React from 'react';
import PageLayout from '../component/PageLayout';
import '../css/AnnouncementPage.css';

const AnnouncementPage = () => {
    const announcements = [
        { id: 1, title: "Maintenance Notice", content: "Scheduled maintenance will take place on 25th August. Please be prepared for a temporary shutdown." },
        { id: 2, title: "Community Event", content: "Join us for a community gathering on 28th August. All residents are welcome!" },
        // Add more announcements as needed
    ];

    return (
        <PageLayout>
            <div className="announcement-container">
                <h1 className="announcement-title">Community Announcements</h1>
                <p className="announcement-description">Stay updated with the latest community news and announcements.</p>
                <div className="message-box">
                    {announcements.map(announcement => (
                        <div key={announcement.id} className="message">
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
