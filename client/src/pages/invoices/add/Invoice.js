import { Types } from "mongoose";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { invoiceFormFields } from "./inputInvoice";
import markup from "../../../markup/inputs";

const AddInvoice = () => {
  const { id } = useParams();
  const [newInvoice, setNewInvoice] = useState({
    _id: Types.ObjectId(),
    invoiceNumber: "",
  });

  const handleClick = () => {
    axios.post(`/${id}/addInvoice`, newInvoice).then((res) => {
      console.log(res.data);
      setNewInvoice({
        _id: Types.ObjectId(),
        invoiceNumber: "",
      });
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };
  return (
    <div className="main__container">
      <div className="invoice__home-logo">
        <h1>Invoice</h1>
        <p>There are total 7 invoices</p>
      </div>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>
      <button className="button back_button" onClick={handleClick}>
        Add
      </button>

      <div className="details__box">
        {invoiceFormFields.map((item) => markup(item, handleChange))}
      </div>
    </div>
  );
};

export default AddInvoice;
