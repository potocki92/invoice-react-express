import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Header.css";

const Header = ({ setLoginUser }) => {
  let { id } = useParams();
  const [user, setItems] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setItems(user);
    }
  }, []);
  return (
    <header className="header">
      <div className="container is-flex">
        <h1 className="header__logo">Invoices {user.name}</h1>
        <div className="header__flex-row">
          <Link to={`/${id}/user`}>
            <div className="header-circle"></div>
          </Link>
          <div
            className="button header-button"
            onClick={() => setLoginUser({})}
          >
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
