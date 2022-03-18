import {
  SCHOLARSHIP_LIST_REQUEST,
  SCHOLARSHIP_LIST_SUCCESS,
  SCHOLARSHIP_LIST_FAIL,
} from "../constants/scholarshipConstants";

export const getScholarshipData = (state = {}, action) => {
  switch (action.type) {
    case SCHOLARSHIP_LIST_REQUEST:
      return {
        loading: true,
      };
    case SCHOLARSHIP_LIST_SUCCESS:
      const all = action.payload;
      const low = action.payload.filter(
        (item) => item.studentDetails[0].studentStatus === "Detained"
      );
      const granted = action.payload.filter(
        (item) => item.studentDetails[0].scholarshipStatus === "Granted"
      );
      const declined = action.payload.filter(
        (item) => item.studentDetails[0].scholarshipStatus === "Declined"
      );
      console.log(all);
      console.log(low);
      console.log(granted);
      console.log(declined);
      return {
        loading: false,
        scholarshipList: all,
        lowAttendanceList: low,
        scholarshipGrantedList: granted,
        scholarshipDeclinedList: declined,
      };
    case SCHOLARSHIP_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
