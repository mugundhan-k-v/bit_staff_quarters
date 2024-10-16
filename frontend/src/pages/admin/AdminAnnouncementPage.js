import React, { useState, useEffect } from 'react';
import PageLayout from '../../component/admin/PageLayout';
import '../../css/admin/AdminAnnouncementPage.css';

const AdminAnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

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

    const handleEdit = (announcement) => {
        console.log('Editing announcement:', announcement); // Debugging line
        setEditingAnnouncement(announcement);
        setShowEditModal(true);
    };

    const handleSave = async () => {
        console.log('Saving announcement:', editingAnnouncement); // Debugging line
        await fetch(`http://localhost:5000/api/announcements/${editingAnnouncement._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingAnnouncement)
        });
        setEditingAnnouncement(null);
        setShowEditModal(false);
        // Refresh announcements
        const updatedAnnouncements = await fetch('http://localhost:5000/api/announcements').then(response => response.json());
        console.log('Updated announcements:', updatedAnnouncements); // Debugging line
        setAnnouncements(updatedAnnouncements);
    };

    const handleDelete = async (id) => {
        console.log('Deleting announcement:', id); // Debugging line
        await fetch(`http://localhost:5000/api/announcements/${id}`, {
            method: 'DELETE'
        });
        // Refresh announcements
        const updatedAnnouncements = await fetch('http://localhost:5000/api/announcements').then(response => response.json());
        console.log('Updated announcements:', updatedAnnouncements); // Debugging line
        setAnnouncements(updatedAnnouncements);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Changing announcement:', { ...editingAnnouncement, [name]: value }); // Debugging line
        setEditingAnnouncement({ ...editingAnnouncement, [name]: value });
    };

    const handleNewAnnouncementChange = (e) => {
        const { name, value } = e.target;
        setNewAnnouncement({ ...newAnnouncement, [name]: value });
    };

    const handleAddAnnouncement = async () => {
        console.log('Adding new announcement:', newAnnouncement); // Debugging line
        await fetch('http://localhost:5000/api/announcements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnnouncement)
        });
        setNewAnnouncement({ title: '', content: '' });
        setShowAddModal(false);
        // Refresh announcements
        const updatedAnnouncements = await fetch('http://localhost:5000/api/announcements').then(response => response.json());
        console.log('Updated announcements:', updatedAnnouncements); // Debugging line
        setAnnouncements(updatedAnnouncements);
    };

    return (
        <PageLayout>
            <div className="admin-announcement-container">
                <h1 className="admin-announcement-title">Admin Announcements</h1>
                <button className="add-announcement-button" onClick={() => setShowAddModal(true)}>
                    <i className="fas fa-plus"></i> Add New Announcement
                </button>
                <div className="admin-announcement-table-container">
                    <table className="admin-announcement-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map(announcement => (
                                <tr key={announcement._id}>
                                    <td>{announcement.title}</td>
                                    <td>{announcement.content}</td>
                                    <td className="action-buttons">
                                        <button className="anedit-button" onClick={() => handleEdit(announcement)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="delete-button" onClick={() => handleDelete(announcement._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showEditModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                            <h2>Edit Announcement</h2>
                            <input
                                type="text"
                                name="title"
                                value={editingAnnouncement.title}
                                onChange={handleChange}
                            />
                            <textarea
                                name="content"
                                value={editingAnnouncement.content}
                                onChange={handleChange}
                            />
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                )}

                {showAddModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
                            <h2>Add New Announcement</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newAnnouncement.title}
                                onChange={handleNewAnnouncementChange}
                            />
                            <textarea
                                name="content"
                                placeholder="Content"
                                value={newAnnouncement.content}
                                onChange={handleNewAnnouncementChange}
                            />
                            <button onClick={handleAddAnnouncement}>Add Announcement</button>
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default AdminAnnouncementPage;