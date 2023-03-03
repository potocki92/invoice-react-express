import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { invoiceFormFields } from "./inputInvoice";
import markup from "../../markup/inputs";
import { InvoiceList } from "./InvoiceList";

const Invoices = () => {
  let { id } = useParams();
  const [newInvoice, setNewInvoice] = useState({
    _id: Types.ObjectId(), // wygeneruj nowe ID
    invoiceName: "",
  });
  const [allInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/${id}/invoices`);
        setAllInvoices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  console.log(allInvoices);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleClick = () => {
    axios
      .post(`/${id}/addInvoice`, newInvoice)
      .then((res) => {
        console.log(res.data);
        setAllInvoices([...allInvoices, newInvoice]); // aktualizujemy stan listy produktów
        setNewInvoice({
          _id: Types.ObjectId(), // wygeneruj nowe ID
          invoiceName: "",
        }); // resetujemy dane dotyczące produktu
      })
      .catch((err) => console.error(err));
  };
  const deleteProduct = (invoiceId) => {
    axios
      .delete(`/${id}/invoices/${invoiceId}`)
      .then((res) => {
        console.log(res.data);
        setAllInvoices(
          allInvoices.filter((product) => product._id !== invoiceId)
        );
      })
      .catch((err) => console.error(err));
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

      <div className="details__box">
        {invoiceFormFields.map((item) => markup(item, handleChange))}
      </div>

      <button className="button mark__as-btn" onClick={handleClick}>
        Click
      </button>
      <InvoiceList id={id} invoices={allInvoices} onDelete={deleteProduct} />
    </div>
  );
};

export default Invoices;
