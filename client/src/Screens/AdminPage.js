import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-nav">
          <a href="/" className="admin-nav-active">
            All
          </a>
          <a href="/">Low Attendance</a>
          <a href="/">Scholarship Granted</a>
          <a href="/">Scholarship Declined</a>
        </div>
        <div className="admin-content-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>RollNumber</th>
                <th>Name</th>
                <th>Student Status</th>
                <th>Scholarship Status</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
