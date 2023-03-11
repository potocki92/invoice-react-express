import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const InvoiceEdit = () => {
  let { id, invoiceId } = useParams();

  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/${id}/invoice/${invoiceId}`);
        setInvoice(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoice();
  }, [id, invoiceId]);

  if (!invoice) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Edit Invoice {invoice._id}</h1>
      <p>Invoice number: {invoice.invoiceNumber}</p>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>
      <div className="details__box details__box-wrapper">
        <h2>Invoice Details</h2>
        <div className="form__group">
          <p>Invoice Date</p>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.date?.invoiceDate}
          />
        </div>
        <div className="form__group">
          <p>Due Date</p>
          <input type="date" name="dueDate" value={invoice.date?.dueDate} />
        </div>
      </div>{" "}
      <div className="details__box details__box-wrapper">
        <h2>Client</h2>

        <div className="details__box">
          <div className="form__group">
            <label htmlFor="clientName">Client name:</label>
            <input
              type={"text"}
              id="clientName"
              name="clientName"
              value={invoice.client?.clientName}
            />
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientNip">Client NIP:</label>
              <input
                type={"text"}
                id={"clientNip"}
                name="clientNip"
                value={invoice.client?.clientNip}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientRegon">Client REGON:</label>
              <input
                type={"text"}
                id={"clientRegon"}
                name="clientRegon"
                value={invoice.client?.clientRegon}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientEmail">Client email:</label>
              <input
                type={"email"}
                id={"clientEmail"}
                name="clientEmail"
                value={invoice.client?.clientEmail}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientPhone">Client phone:</label>
              <input
                type={"tel"}
                id={"clientPhone"}
                name="clientPhone"
                value={invoice.client?.clientPhone}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientCity">Client city:</label>
              <input
                type={"text"}
                id={"clientCity"}
                name="clientCity"
                value={invoice.client?.clientCity}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientPostal">Client postal:</label>
              <input
                type={"text"}
                id={"clientPostal"}
                name="clientPostal"
                value={invoice.client?.clientPostal}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientAddress">Client address:</label>
              <input
                type={"text"}
                id={"clientAddress"}
                name="clientAddress"
                value={invoice.client?.clientAddress}
              />
            </div>
          </div>
        </div>
        <div className="details__box details__box-wrapper">
          <h2>Product</h2>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="productsName">Product name:</label>
              <input
                type={"text"}
                id={"productsName"}
                name="productsName"
                value={invoice.product?.productsName}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="productsQty">Qty:</label>
              <input
                type={"number"}
                id={"productsQty"}
                name="productsQty"
                value={invoice.product?.productsQty}
              />
            </div>
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="productsPrice">Price:</label>
              <input
                type={"number"}
                id={"productsPrice"}
                name="productsPrice"
                value={invoice.product?.productsPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEdit;
