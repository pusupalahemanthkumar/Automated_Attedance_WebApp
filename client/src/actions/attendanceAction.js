import axios from "axios";
import {
    ATTENDANCE_LIST_REQUEST,
    ATTENDANCE_LIST_SUCCESS,
    ATTENDANCE_LIST_FAIL
} from "../constants/attendanceConstants";

export const getAttendance = (query) => {
    return async (dispatch, getState) => {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`,
            },
        };
        try {
            dispatch({ type: ATTENDANCE_LIST_REQUEST });
            let response;
            response = await axios.post(
                "http://localhost:5000/api/attendance/get",
                query,
                config
            );
            dispatch({
                type: ATTENDANCE_LIST_SUCCESS,
                payload: response.data,
            })

        } catch (error) {
            dispatch({
                type: ATTENDANCE_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,

            })

        }

    }


}