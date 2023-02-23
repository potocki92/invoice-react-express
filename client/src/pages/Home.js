
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  let { id } = useParams();
  
  const [allInvoice, setAllInvoice] = useState();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/${id}/invoice`);
        console.log("Invoice");
        setAllInvoice(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [id]);

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
      <Link to={"invoicee"}>
        <div className="invoice__container">
          {/* Invoice item */}
          <div className="invoice__item">
            <div>
              <h5 className="invoice__id">RTRRD</h5>
            </div>

            <div>
              <h6 className="invoice__client">Ola Skóra</h6>
            </div>

            <div>
              <p className="paragraph invoice__created">02-02-2023</p>
            </div>

            <div>
              <h3 className="invoice__total">0</h3>
            </div>

            <div>
              <button className="button pending__status">pending</button>
            </div>
          </div>
        </div>
      </Link>
    </main>
  );
};
