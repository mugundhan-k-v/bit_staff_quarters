import React from 'react';
import PageLayout from '../../component/admin/PageLayout';
import "../../css/admin/admininmatedetails.css"

const AdminInmateDetailsPage = ({ inmates, sidebarCollapsed }) => {
  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Inmate Details</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search..."  />
            <button className="add-button">search </button>
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
                {inmates.map((inmate, index) => (
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
