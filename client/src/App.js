import React, { Fragment, useEffect } from "react";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Authentication from "./components/RegisterLoginForms/Authentication";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/products/Products";
import Client from "./pages/clients/Client";
import User from "./pages/user/User";
import Invoices from "./pages/invoices/Invoice";
import InvoiceEdit from "./pages/invoices/edit/InvoiceEdit";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App is-flex">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user && user.token ? (
                <Homepage setLoginUser={setLoginUser} user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/invoice" element={<Invoices />} />
            <Route path="/invoice/:invoiceId" element={<InvoiceEdit />} />
            <Route path="/user" element={<User />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients" element={<Client />} />
          </Route>
          <Route
            path="/login"
            element={
              user && user.token ? (
                <Navigate to="/" replace />
              ) : (
                <Authentication setLoginUser={setLoginUser} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
