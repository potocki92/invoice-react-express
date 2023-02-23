import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ setLoginUser }) => {
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
        <div className="button header-button" onClick={() => setLoginUser({})}>
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;
