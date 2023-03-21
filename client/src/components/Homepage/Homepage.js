import React, { useState, Fragment } from "react";
import "./Homepage.css";
import { Outlet, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

const Homepage = ({ setLoginUser, user }) => {
  let location = useLocation();


  const [items, setItems] = useState([]);
  return (
    <Fragment>
      <div className="homepage">
        <Header setLoginUser={setLoginUser} />
        {location.pathname === "/" && user._id ? (
          <div>
            <h1>Hello, {user.username}!</h1>
            <p>Your ID: {user._id}</p>
          </div>
        ) : (
          <div >
            <Outlet />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Homepage;
