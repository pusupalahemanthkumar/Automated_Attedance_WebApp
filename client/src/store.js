// Importing Required Files And Packages Here
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { getAttendance } from "./reducers/attendanceReducers";
import { getScholarshipData } from "./reducers/scholarshipReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  attendanceListData: getAttendance,
  scholarshipListData: getScholarshipData,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  attendanceListData: {
    attendanceList: [],
  },
  scholarshipListData: {
    scholarshipList: [],
    lowAttendanceList:[],
    scholarshipGrantedList:[],
    scholarshipDeclinedList:[]
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
