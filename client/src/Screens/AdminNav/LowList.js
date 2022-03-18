import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScholarshipDetails } from "../../actions/scholarshipAction";
import Spinner from "../../components/Spinner/Spinner";

const LowList = () => {
  const scholarshipListStore = useSelector(
    (state) => state.scholarshipListData
  );
  const dispatch = useDispatch();

  const { loading, lowAttendanceList, error } = scholarshipListStore;

  useEffect(() => {
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
    UI = (
      <table className="attendance-table">
        <thead>
          <tr>
            <th>RollNumber</th>
            <th>Student Status</th>
            <th>Scholarship Status</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {lowAttendanceList.map((row) => {
            return (
              <tr key={row._id}>
                <td>{row.studentDetails[0].rollNumber}</td>
                <td>{row.studentDetails[0].studentStatus}</td>
                <td>{row.studentDetails[0].scholarshipStatus}</td>
                <td>{row.percentage * 100}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <div className="admin-content-container">{UI}</div>;
};

export default LowList;
