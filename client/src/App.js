import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HomeProfile from "./components/auth/HomeProfile";
import PrincipalPanel from "./components/elements/PrincipalPanel";
import AdminDashboard from "./components/admin/AdminDashboard";
import Cart from "./components/elements/Cart";

require("dotenv").config();

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={PrincipalPanel} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={HomeProfile} />
        <Route exact path="/cart" component={Cart} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
