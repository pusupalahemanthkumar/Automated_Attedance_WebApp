import axios from "axios";
export const updateStudentStatusHandler = async (
  rollNumber,
  studentStatus,
  token
) => {
  let data;
  if (studentStatus === "Regular") {
    data = {
      rollNumber,
      studentStatus: "Detained",
    };
  } else {
    data = {
      rollNumber,
      studentStatus: "Regular",
    };
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "/api/scholarship/student-status",
    data,
    config
  );
  console.log(response);
};

export const updateScholarshipStatusHandler = async (
  rollNumber,
  scholarshipStatus,
  token
) => {
  let data;
  if (scholarshipStatus === "Declined") {
    data = {
      rollNumber,
      scholarshipStatus: "Granted",
    };
  } else {
    data = {
      rollNumber,
      scholarshipStatus: "Declined",
    };
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "http://localhost:5000/api/scholarship//scholarship-status",
    data,
    config
  );
  console.log(response);
};
