import {
    ATTENDANCE_LIST_REQUEST,
    ATTENDANCE_LIST_SUCCESS,
    ATTENDANCE_LIST_FAIL
} from "../constants/attendanceConstants";

export const getAttendance = (state = {}, action) => {
    switch (action.type) {
        case ATTENDANCE_LIST_REQUEST:
            return {
                loading: true,
            };
        case ATTENDANCE_LIST_SUCCESS:
            return {
                loading: false,
                AttendanceList: action.payload
            }
        case ATTENDANCE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}