import React, { useEffect, useState } from 'react';
import PageLayout from '../../component/admin/PageLayout';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../css/admin/adminhomepage.css';

// Registering components to ChartJS
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AdminHomePage = () => {
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({
    Plumbing: 0,
    Carpentry: 0,
    Electrical: 0,
    Gardening: 0,
    Others: 0,
  });
  const [statusCounts, setStatusCounts] = useState({
    Registered: 0,
    Resolved: 0,
    InProgress: 0,
  });

  useEffect(() => {
    // Fetch recent complaints from the API
    const fetchRecentComplaints = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recent-complaints'); // Adjust the API endpoint as needed
        const data = await response.json();
        setRecentComplaints(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching recent complaints:', error);
        setRecentComplaints([]); // Set to empty array in case of error
      }
    };

    // Fetch category and status counts from the API
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/complaints-stats'); // Adjust the API endpoint as needed
        const data = await response.json();
        setCategoryCounts(data.categories);
        setStatusCounts(data.status);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setCategoryCounts({
          Plumbing: 0,
          Carpentry: 0,
          Electrical: 0,
          Gardening: 0,
          Others: 0,
        });
        setStatusCounts({
          Registered: 0,
          Resolved: 0,
          InProgress: 0,
        });
      }
    };

    fetchRecentComplaints();
    fetchCounts();
  }, []);

  const pieData = {
    labels: ['Plumbing', 'Carpentry', 'Electrical', 'Gardening', 'Others'],
    datasets: [
      {
        data: [
          categoryCounts.Plumbing,
          categoryCounts.Carpentry,
          categoryCounts.Electrical,
          categoryCounts.Gardening,
          categoryCounts.Others,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          font: {
            size: 10,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <PageLayout>
      <div className="home-container">
        <h1>Dashboard</h1>

        <div className="charts-and-counts-container">
          <div className="chart" style={{ width: '200px', height: '200px' }}>
            <h3>Complaints by Category</h3>
            <Pie data={pieData} options={options} />
          </div>

          <div className="counts-container">
            <div className="count-item1">
              <h3 className="count-item">Total Registered</h3>
              <p className="count-item">{statusCounts.Registered}</p>
            </div>
            <div className="count-item2">
              <h3 className="count-item">Total In   Progress</h3>
              <p className="count-item">{statusCounts.InProgress}</p>
            </div>
            <div className="count-item3">
              <h3 className="count-item">Total Resolved</h3>
              <p className="count-item">{statusCounts.Resolved}</p>
            </div>
          </div>
        </div>

        <div className="table-container">
          <h2>Recent Complaints</h2>
          <table>
            <thead>
              <tr>
                <th>Faculty Id</th>
                <th>Complaint</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.map((row) => (
                <tr key={row._id}>
                  <td>{row.facultyId}</td>
                  <td>{row.description}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminHomePage;
