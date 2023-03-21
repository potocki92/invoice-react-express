import React, { Fragment, useEffect } from "react";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Authentication from "./components/RegisterLoginForms/Authentication";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import Products from "./pages/products/Products";
import Client from "./pages/clients/Client";
import User from "./pages/user/User";
import Invoices from "./pages/invoices/Invoice";
import InvoiceEdit from "./pages/invoices/edit/InvoiceEdit";

function App() {
  const [user, setLoginUser] = useState({});
  useEffect(() => {
    // Sprawdzanie, czy użytkownik jest już zalogowany w localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Sprawdzenie, czy data zapisu użytkownika w localStorage jest starsza niż jeden dzień
      if (new Date().getTime() - parsedUser.timestamp < 24 * 60 * 60 * 1000) {
        setLoginUser(parsedUser.user);
      }
    }
  }, []);

  const handleLogin = (user) => {
    // Zapisanie danych użytkownika do localStorage po zalogowaniu
    const userToSave = {
      user,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem("user", JSON.stringify(userToSave));
    setLoginUser(user);
  };

  return (
    <div className="App is-flex">
      <Router>
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              user && user._id ? (
                <Navigate to={`/${user._id}`} />
              ) : (
                <Authentication setLoginUser={handleLogin} />
              )
            }
          />
          <Route
            path={`/:id`}
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} user={user} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          >
            <Route path={`/:id`} element={<Home />}></Route>
            <Route path={`/:id/invoice`} element={<Invoices />}></Route>
            <Route
              path={`/:id/invoice/:invoiceId`}
              element={<InvoiceEdit />}
            ></Route>
            <Route path={`/:id/user`} element={<User />}></Route>
            <Route path={`/:id/products`} element={<Products />} />
            <Route path={`/:id/clients`} element={<Client />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
