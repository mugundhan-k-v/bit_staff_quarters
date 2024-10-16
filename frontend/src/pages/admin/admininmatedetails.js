import React, { useState, useEffect } from 'react';
import PageLayout from '../../component/admin/PageLayout';
import "../../css/admin/admininmatedetails.css";

const AdminInmateDetailsPage = ({ sidebarCollapsed }) => {
  const [inmates, setInmates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch inmate data from the backend
    const fetchInmates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/allinmates');
        if (!response.ok) {
          throw new Error('Failed to fetch inmates');
        }
        const data = await response.json();
        setInmates(data);
      } catch (error) {
        console.error('Error fetching inmates:', error);
      }
    };

    fetchInmates();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInmates = inmates.filter(inmate =>
    inmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inmate.relation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inmate.age.toString().includes(searchTerm) ||
    inmate.aadharNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inmate.working.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inmate.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inmate.facultyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Inmate Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="add-button">Search</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relation</th>
                  <th>Age</th>
                  <th>Aadhar No</th>
                  <th>Working</th>
                  <th>Employer</th>
                  <th>Faculty ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredInmates.map((inmate, index) => (
                  <tr key={index}>
                    <td>{inmate.name}</td>
                    <td>{inmate.relation}</td>
                    <td>{inmate.age}</td>
                    <td>{inmate.aadharNo}</td>
                    <td>{inmate.working}</td>
                    <td>{inmate.employer}</td>
                    <td>{inmate.facultyId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminInmateDetailsPage;