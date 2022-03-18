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
      return {
        loading: false,
        scholarshipList: action.payload,
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
