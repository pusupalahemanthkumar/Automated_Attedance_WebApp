import React, { useEffect } from "react";
import {Route, useHistory, Switch } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";

import LoginPage from "./Screens/LoginPage";
import RegisterPage from "./Screens/RegisterPage";
import HomePage from "./Screens/HomePage";
import TakeAttendancePage from "./Screens/TakeAttendancePage";
import DashboardPage from "./Screens/DashboardPage";
import AdminPage from "./Screens/AdminPage";

const ALAN_KEY =
  "032cb63c95e4a228e2cefa5e29d42e1b2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  let history = useHistory();
  useEffect(() => {
    alanBtn({
      key: ALAN_KEY,
      onCommand: ({ command, pageName }) => {
        console.log(pageName);
        if (command === "home") {
          history.push('/');
        }else if(command==="dashboard"){
          history.push("/dashboard");
        }else if(command==="admin"){
          history.push("/admin/all");
        }else if(command==="take attendance"){
          history.push("/take-attendance");
        }else if(command==="login"){
          history.push("/login");
        }else if(command==="register"){
          history.push("/register");
        }
      },
    });
  }, []);
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/take-attendance" component={TakeAttendancePage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/attendance" component={DashboardPage} />
      </Switch>
    </>
  );
};

export default App;
