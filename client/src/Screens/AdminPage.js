import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScholarshipDetails } from "../actions/scholarshipAction";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";

const AdminPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const scholarshipListStore = useSelector(
    (state) => state.scholarshipListData
  );
  const { loading, scholarshipList, error } = scholarshipListStore;

  useEffect(() => {
    if (!userInfo) {
      history.replace("/login");
      return;
    }
    dispatch(getScholarshipDetails({}));
  }, []);

  let UI = null;
  if (loading && !error) {
    UI = (
      <div
        style={{
          width: "100%",
          margin: "auto",
        }}
      >
        <Spinner />
      </div>
    );
  } else if (error) {
    UI = <h1 className="text-center primary-color">{error}</h1>;
  } else {
    UI = scholarshipList.map((row) => {
      return (
        <tr key={row._id}>
          <td>{row.studentDetails[0].rollNumber}</td>
          <td>{row.studentDetails[0].studentStatus}</td>
          <td>{row.studentDetails[0].scholarshipStatus}</td>
          <td>{row.percentage * 100}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-nav">
          <a href="/" className="admin-nav-active">
            All
          </a>
          <a href="/">Low</a>
          <a href="/">Granted</a>
          <a href="/">Declined</a>
        </div>
        <div className="admin-content-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>RollNumber</th>
                <th>Student Status</th>
                <th>Scholarship Status</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>{UI}</tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
