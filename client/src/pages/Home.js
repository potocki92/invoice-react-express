import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { InvoiceList } from "./invoices/InvoiceList";

export const Home = () => {
  let { id } = useParams();
  const [allInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/${id}/invoices`);
        setAllInvoices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [id]);
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
    <main div className="container">
      <div className="invoice__home">
        <div className="invoice__home-logo">
          <h1>Invoice</h1>
          {allInvoices && <p>There are total {allInvoices.length} invoices</p>}
        </div>
        <Link to={`invoice`}>
          <button className="button">Add Invoice</button>
        </Link>
        <Link to={`products`}>
          <button className="button">Products</button>
        </Link>
        <Link to={`clients`}>
          <button className="button">Clients</button>
        </Link>
      </div>
      <InvoiceList id={id} invoices={allInvoices} onDelete={deleteProduct} />
    </main>
  );
};
