import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScholarshipDetails } from "../../actions/scholarshipAction";
import Spinner from "../../components/Spinner/Spinner";
import {
  updateScholarshipStatusHandler,
  updateStudentStatusHandler,
} from "./update_api";

const GrantedList = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const scholarshipListStore = useSelector(
    (state) => state.scholarshipListData
  );
  const dispatch = useDispatch();

  const { loading, scholarshipGrantedList, error } = scholarshipListStore;

  useEffect(() => {
    dispatch(getScholarshipDetails({}));
  }, []);

  const studentStatusClickHandler = async (rollNumber, studentStatus) => {
    await updateStudentStatusHandler(rollNumber, studentStatus, userInfo.token);
    dispatch(getScholarshipDetails({}));
  };

  const scholarshipStatusClickHandler = async (
    rollNumber,
    scholarshipStatus
  ) => {
   const d= await updateScholarshipStatusHandler(
      rollNumber,
      scholarshipStatus,
      userInfo.token
    );
    console.log(d);
    dispatch(getScholarshipDetails({}));
  };

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
            {/* <th>Attendance</th> */}
          </tr>
        </thead>
        <tbody>
          {scholarshipGrantedList.map((row) => {
            return (
              <tr key={row._id}>
                <td>{row.studentDetails[0].rollNumber}</td>
                <td>
                  {row.studentDetails[0].studentStatus}{" "}
                  {row.percentage * 100}
                  <i
                    className="fas fa-pen-square primary-color"
                    onClick={() =>
                      studentStatusClickHandler(
                        row._id,
                        row.studentDetails[0].studentStatus
                      )
                    }
                  ></i>
                </td>
                <td>
                  {row.studentDetails[0].scholarshipStatus}{" "}
                  <i
                    className="fas fa-pen-square primary-color"
                    onClick={() =>
                      scholarshipStatusClickHandler(
                        row._id,
                        row.studentDetails[0].scholarshipStatus
                      )
                    }
                  ></i>
                </td>
                {/* <td>{row.percentage * 100}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <div className="admin-content-container"> {UI}</div>;
};

export default GrantedList;
