import React from 'react';
import PageLayout from '../../component/admin/PageLayout';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../css/admin/adminhomepage.css';

// Registering components to ChartJS
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AdminHomePage = () => {
  // Sample data for pie charts
  const pieData1 = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieData2 = {
    labels: ['Category D', 'Category E', 'Category F'],
    datasets: [
      {
        data: [15, 25, 35],
        backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const pieData3 = {
    labels: ['Category G', 'Category H', 'Category I'],
    datasets: [
      {
        data: [20, 30, 50],
        backgroundColor: ['#FFCD56', '#FF9F40', '#36A2EB'],
      },
    ],
  };

  // Sample data for table
  const tableData = [
    { id: 1, complaint: 'Broken Door', status: 'Resolved' },
    { id: 2, complaint: 'Leaky Faucet', status: 'Pending' },
    { id: 3, complaint: 'Power Outage', status: 'In Progress' },
  ];

  return (
    <PageLayout>
      <div className="home-container">
        <h1>Dashboard</h1>

        <div className="charts-container">
          <div className="chart">
            <h3>Complaints Registered</h3>
            <Pie data={pieData1} />
          </div>
          <div className="chart">
            <h3>Complaints Resloved</h3>
            <Pie data={pieData2} />
          </div>
          <div className="chart">
            <h3>Total Complaints Registered</h3>
            <Pie data={pieData3} />
          </div>
        </div>

        <div className="table-container">
          <h2>Complaints Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Complaint</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.complaint}</td>
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
