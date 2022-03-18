import axios from "axios";
import {
  SCHOLARSHIP_LIST_REQUEST,
  SCHOLARSHIP_LIST_SUCCESS,
  SCHOLARSHIP_LIST_FAIL,
} from "../constants/scholarshipConstants";

export const getScholarshipDetails = (query) => {
  return async (dispatch, getState) => {
    console.log(query);
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      dispatch({ type: SCHOLARSHIP_LIST_REQUEST });
      let response;
      response = await axios.get(
        "http://localhost:5000/api/scholarship/details",
        config
      );
      dispatch({
        type: SCHOLARSHIP_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: SCHOLARSHIP_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
