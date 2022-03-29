import React ,{useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";

import LoginPage from "./Screens/LoginPage";
import RegisterPage from "./Screens/RegisterPage";
import HomePage from './Screens/HomePage';
import TakeAttendancePage from './Screens/TakeAttendancePage';
import DashboardPage from './Screens/DashboardPage';
import AdminPage from "./Screens/AdminPage"

const ALAN_KEY="032cb63c95e4a228e2cefa5e29d42e1b2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  useEffect(()=>{
    alanBtn({
      key:ALAN_KEY,
      onCommand:({command})=>{
        if(command==="test"){
          alert("testing");
        }
      }
    })

  },[])
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/dashboard" exact component={DashboardPage} />
      <Route path="/take-attendance"  component={TakeAttendancePage} />
      <Route path="/admin"  component={AdminPage} />
      <Route path="/login"  component={LoginPage} />
      <Route path="/register"  component={RegisterPage} />
      <Route path="/attendance"  component={DashboardPage} />
    </Router>
  )
}

export default App
