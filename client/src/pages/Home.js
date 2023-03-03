import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  let { id } = useParams();
  const [allInvoice, setAllInvoice] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/${id}/invoices`);
        setAllInvoice(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [id]);

  console.log(allInvoice);
  return (
    <main div className="main__container">
      <div className="invoice__home">
        <div className="invoice__home-logo">
          <h1>Invoice</h1>
          {allInvoice && <p>There are total {allInvoice.length} invoices</p>}
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
    </main>
  );
};
