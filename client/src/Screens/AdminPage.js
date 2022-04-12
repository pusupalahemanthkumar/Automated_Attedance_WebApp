import React, { useEffect } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import AllList from "./AdminNav/AllList";
import LowList from "./AdminNav/LowList";
import GrantedList from "./AdminNav/GrantedList";
import DeclinedList from "./AdminNav/DeclinedList";

const AdminPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo && userInfo.role === "admin") {
      history.replace("/");
      return;
    }
  }, [userInfo, history]);

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-nav">
          <NavLink to="/admin/all" activeClassName="admin-nav-active">
            All
          </NavLink>
          <NavLink to="/admin/low" activeClassName="admin-nav-active">
            Low
          </NavLink>
          <NavLink to="/admin/granted" activeClassName="admin-nav-active">
            Granted
          </NavLink>
          <NavLink to="/admin/declined" activeClassName="admin-nav-active">
            Declined
          </NavLink>
        </div>
        <Switch>
          <Route path="/admin/all" component={AllList} />
          <Route path="/admin/low" component={LowList} />
          <Route path="/admin/granted" component={GrantedList} />
          <Route path="/admin/declined" component={DeclinedList} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
