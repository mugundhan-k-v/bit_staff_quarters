import React, { useState, useEffect } from 'react';
import PageLayout from '../../component/admin/PageLayout';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineUserAdd } from 'react-icons/ai';
import '../../css/admin/AddUserPage.css';

const AddUserPage = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    facultyId: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    quarters: '',
    role: 'User' // Default role
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch existing users from the backend
    fetch('http://localhost:5000/api/users', {
      credentials: 'include' // Include credentials in the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials in the request
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(updatedUser => {
          console.log('Updated User:', updatedUser); // Add this line
          setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
          setEditingUser(null);
          setShowForm(false);
          setUserData({
            facultyId: '',
            password: '',
            name: '',
            email: '',
            phone: '',
            quarters: '',
            role: 'User'
          });
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Add new user
      fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials in the request
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(newUser => {
          console.log('New User:', newUser); // Add this line
          setUsers([...users, newUser]);
          setShowForm(false);
          setUserData({
            facultyId: '',
            password: '',
            name: '',
            email: '',
            phone: '',
            quarters: '',
            role: 'User'
          });
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserData(user);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include credentials in the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserData({
      facultyId: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      quarters: '',
      role: 'User'
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
    setUserData({
      facultyId: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      quarters: '',
      role: 'User'
    });
  };

  return (
    <PageLayout>
      <div className="add-user-container">
        <h1>Manage Users</h1>
        <button className="add-user-btn" onClick={handleAddUser}>
          <AiOutlineUserAdd size={24} />
        </button>
        <table className="user-table">
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Quarters</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.facultyId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.quarters}</td>
                <td>{user.role}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(user)}>
                      <AiOutlineEdit size={20} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showForm && (
          <div className="form-popup">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="add-user-form">
                <label>
                  Faculty ID:
                  <input
                    type="text"
                    name="facultyId"
                    value={userData.facultyId}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Quarters:
                  <input
                    type="text"
                    name="quarters"
                    value={userData.quarters}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Role:
                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </label>
                <div className="form-buttons">
                  <button className="submit-btn" type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
                  <button className="cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default AddUserPage;