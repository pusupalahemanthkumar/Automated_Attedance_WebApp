import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./Screens/LoginPage";
import RegisterPage from "./Screens/RegisterPage";
import HomePage from './Screens/HomePage';
import TakeAttendancePage from './Screens/TakeAttendancePage';
import DashboardPage from './Screens/DashboardPage';


const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/dashboard" exact component={DashboardPage} />
      <Route path="/take-attendance"  component={TakeAttendancePage} />
      <Route path="/login"  component={LoginPage} />
      <Route path="/register"  component={RegisterPage} />
      <Route path="/attendance"  component={DashboardPage} />
    </Router>
  )
}

export default App
