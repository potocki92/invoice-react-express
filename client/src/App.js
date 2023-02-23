import React, { Fragment } from "react";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Authentication from "./components/RegisterLoginForms/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import InvoiceDetails from "./pages/invoices/[invoiceid]";
import Products from "./pages/products/Products";
import Client from "./pages/clients/Client";
import AddInvoice from "./pages/invoices/add/Invoice";

function App() {
  const [user, setLoginUser] = useState({});
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <div className="App is-flex">
      <Router>
        <Routes>
          <Route
            exact
            path={user && user._id ? `/:id` : "/"}
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} user={user._id} />
              ) : (
                <Authentication setLoginUser={setLoginUser} />
              )
            }
          >
            <Route path={`/:id`} element={<Home />}></Route>
            <Route path={`/:id/invoice`} element={<AddInvoice />} />
            <Route path={`/:id/products`} element={<Products />} />
            <Route path={`/:id/clients`} element={<Client />} />
            <Route path={`/:id/invoicee`} element={<InvoiceDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
