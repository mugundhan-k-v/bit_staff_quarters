import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';
import '../../css/user/inmatedetails.css';

const InmateDetailsPage = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const { facultyId } = useContext(FacultyContext);

  const [inmates, setInmates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Faculty ID:", facultyId);  // Check the value of facultyId
    const fetchInmates = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/inmates?facultyId=${facultyId}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const contentType = response.headers.get("content-type");
        console.log('Response content type:', contentType); // Log the content type
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error text:', errorText); // Log the error text
          throw new Error(`Invalid response: ${errorText}`);
        }
        let data;
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else if (contentType.includes("text/html")) {
          data = await response.text();
          console.error('Received HTML response:', data); // Log the HTML response
          throw new Error("Invalid response: Expected JSON but received HTML");
        } else {
          throw new Error("Invalid response: Unexpected content type");
        }
        console.log('Fetched data:', data); // Log the fetched data
        setInmates(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inmate data:', error);
        setLoading(false);
      }
    };
    if (facultyId) {
      fetchInmates();
    }
  }, [facultyId]);

  const filteredInmates = inmates.filter(inmate =>
    inmate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    navigate('/addinmate');
  };

  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Inmate Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="add-button" onClick={handleAddClick}>
              Add <strong>+</strong>
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div>Loading...</div>
          ) : (
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
                  </tr>
                </thead>
                <tbody>
                  {filteredInmates.length > 0 ? (
                    filteredInmates.map((inmate, index) => (
                      <tr key={index}>
                        <td>{inmate.name}</td>
                        <td>{inmate.relation}</td>
                        <td>{inmate.age}</td>
                        <td>{inmate.aadharNo}</td>
                        <td>{inmate.working ? 'Yes' : 'No'}</td>
                        <td>{inmate.employer}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No inmates found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default InmateDetailsPage;