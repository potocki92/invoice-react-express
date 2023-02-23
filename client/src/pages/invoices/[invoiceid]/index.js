import React from "react";
import { Link, useParams } from "react-router-dom";

const InvoiceDetails = () => {
  let { id } = useParams();
  console.log(id); // Pełna ścieżka URL
  return (
    <div className="main__container">
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>
      {/* invoices details */}
      <div className="invoice__details-header">
        <div className="details__status">
          <p>Status</p>

          <button className="button pending__status">pending</button>
        </div>

        <div className="details__btns">
          <Link to={"/edit"}>
            <button className="button edit__btn">Edit</button>
          </Link>
          <button className="button delete__btn">Delete</button>
          <button className="button mark__as__button">Mark as paid</button>
        </div>
      </div>

      {/* invoice details */}
      <div className="invoice__details">
        <div className="details__box">
          <div>
            <h4>RT580G</h4>
            <p>Re-branding</p>
          </div>
          <div>
            <p>Block - B, Road - 41</p>
            <p>Sylhet</p>
            <p>SYL 3108</p>
            <p>Bsadsadasda</p>
          </div>
        </div>

        {/* details box 2 */}
        <div className="details__box">
          <div>
            <div className="invoice__created-date">
              <p>Invoice Date</p>
              <h4>02-02-2023</h4>
            </div>
            <div>
              <p className="invoice__payment">Payment Due</p>
              <h4>02-02-2023</h4>
            </div>
          </div>

          {/* invoice client address */}
          <div className="invoice__client-address">
            <p>Bill to</p>
            <h4>Mateusz Potocki</h4>
            <div>
              <p>Block - A, Road - 0</p>
              <p>Sylhet</p>
              <p>SYL 3108</p>
              <p>Bsadsadasda</p>
            </div>
          </div>

          <div>
            <p>Send to</p>
            <h4>email@email.com</h4>
          </div>
        </div>
        {/* invoice items */}
        <div className="invoice__item-box">
          <ul className="list">
            <li className="list__item">
              <p className="item__name-box">Item Name</p>
              <p className="list__item-box">Qty</p>
              <p className="list__item-box">Price</p>
              <p className="list__item-box">Total</p>
            </li>

            {/* invoice item */}
            <li className="list__item">
              <div className="item__name-box">
                <h5>Ecommerce Website</h5>
              </div>

              <div className="list__item-box">
                <p>2</p>
              </div>
              <div className="list__item-box">
                <p>$225</p>
              </div>
              <div className="list__item-box">
                <h5>$450</h5>
              </div>
            </li>
          </ul>
        </div>

        {/* grand total */}
        <div className="grand__total">
          <h5>Grand Total</h5>
          <h2>$450</h2>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
