import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditItem = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const senderStreet = useRef("");
  const senderCity = useRef("");
  const senderPostalCode = useRef("");
  const senderCountry = useRef("");
  const clientName = useRef("");
  const clientEmail = useRef("");
  const clientStreet = useRef("");
  const clientCity = useRef("");
  const clientPostalCode = useRef("");
  const clientCountry = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const paymentTerms = useRef("");

  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
    console.log(items);
  };

  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  // delete
  const deleteItem = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };

  const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0)
  return (
    <div className="main__container">
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>Edit #RT5840</h3>
          <Link to={"/"}>
            <button className="button header-button">Home</button>
          </Link>
        </div>

        {/* new invoice body */}
        <div className="new__invoice-body">
          {/* bill from */}
          <div className="bill__from">
            <p className="bill__title">Bill from</p>
            <div className="form__group">
              <p>Street Address</p>
              <input type={"text"} ref={senderStreet} />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input type={"text"} ref={senderCity} />
              </div>
              <div>
                <p>Postal Code</p>
                <input type={"text"} ref={senderPostalCode} />
              </div>
              <div>
                <p>Country</p>
                <input type={"text"} ref={senderCountry} />
              </div>
            </div>
          </div>

          {/* bill to */}
          <div className="bill__to">
            <p className="bill__title">Bill to</p>
            <div className="form__group">
              <p>Client Name</p>
              <input type={"text"} ref={clientName} />
            </div>
            <div className="form__group">
              <p>Client Email</p>
              <input type={"email"} ref={clientEmail} />
            </div>
            <div className="form__group">
              <p>Street Address</p>
              <input type={"text"} ref={clientStreet} />
            </div>
            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input type={"text"} ref={clientCity} />
              </div>
              <div>
                <p>Postal Code</p>
                <input type={"text"} ref={clientPostalCode} />
              </div>
              <div>
                <p>Country</p>
                <input type={"text"} ref={clientCountry} />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Invoice Date</p>
                <input type={"date"} ref={createdAt} />
              </div>
              <div className="inline__group">
                <p>Payment Terms</p>
                <input type={"text"} ref={paymentTerms} />
              </div>
            </div>

            <div className="form__group">
              <p>Project Description</p>
              <input type={"text"} ref={description} />
            </div>
          </div>

          {/* invoice product items */}
          <div className="invoice__items">
            <h3>Item List</h3>
            {items?.map((items, i) => (
              <div className="item" key={i}>
                <div className="form__group inline__form-group">
                  <div>
                    <p>Item Name</p>
                    <input
                      type={"text"}
                      name="name"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qty</p>
                    <input
                      type={"number"}
                      name="quantity"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Price</p>
                    <input
                      type={"number"}
                      name="price"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>
                  <div>
                    <p>Total</p>
                    <h4>{items.total}</h4>
                  </div>

                  <button
                    className="button edit__btn"
                    onClick={() => deleteItem(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="button add__item-btn" onClick={addItem}>
            Add Item
          </button>

          <div className="new__invoice-btns" style={{ justifyContent: "end" }}>
            <div>
              <Link to={"/invoices/id"}>
              <button className="draft__btn">
                Cancel
              </button>
              </Link>
              <button className="mark__as-bnt">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
