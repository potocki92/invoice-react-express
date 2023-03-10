import React, { Fragment, useEffect } from "react";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Authentication from "./components/RegisterLoginForms/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    // Zapisanie danych użytkownika do localStorage po zalogowaniu
    const userToSave = {
      _id: user._id,
      user: user.user,
    };
    localStorage.setItem("user", JSON.stringify(userToSave));
  }, [user]);
  return (
    <div className="App is-flex">
      <Router>
        <Routes>
          <Route
            exact
            path={user && user._id ? `/:id` : "/"}
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} user={user} />
              ) : (
                <Authentication setLoginUser={setLoginUser} />
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
