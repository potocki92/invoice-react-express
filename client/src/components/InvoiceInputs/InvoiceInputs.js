import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

/**
Component for displaying and editing invoice input fields.
@param {Object} props - Component props
@param {Object} props.invoice - Invoice data object
@param {Function} props.setNewInvoice - Function to update invoice data
@param {Array} props.clients - Array of client objects
@param {Array} props.products - Array of product objects
@param {Object} props.selectedProduct - Selected product object
@param {Number} props.selectedProductIndex - Index of the selected product
@returns {JSX.Element} - Rendered component
*/
const InvoiceInputs = ({
  invoice,
  setNewInvoice,
  clients,
  products,
  selectedProduct,
  selectedProductIndex,
}) => {
  const [clientName, setClientName] = useState(invoice.client.clientName || "");
  const [clientNip, setClientNip] = useState(invoice.client.clientNip || "");
  const [clientRegon, setClientRegon] = useState(
    invoice.client.clientRegon || ""
  );
  const [clientEmail, setClientEmail] = useState(
    invoice.client.clientEmail || ""
  );
  const [clientPhone, setClientPhone] = useState(
    invoice.client.clientPhone || ""
  );
  const [clientCity, setClientCity] = useState(invoice.client.clientCity || "");
  const [clientPostal, setClientPostal] = useState(
    invoice.client.clientPostal || ""
  );
  const [clientAddress, setClientAddress] = useState(
    invoice.client.clientAddress || ""
  );
  const [selectedClient, setSelectedClient] = useState(invoice.client || "");
  const [dueDate, setDueDate] = useState(invoice.date?.dueDate);
  const [invoiceDate, setInvoiceDate] = useState(invoice.date?.invoiceDate);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState(
    invoice.notes?.notes ?? "It was great doing business with you."
  );

  /*
      This code uses the useEffect hook to calculate the total amount of the products in an invoice 
      whenever the invoice.products.items array changes.
  
      Inside the hook, it first initializes the totalAmount variable to zero. 
      Then, it checks if the invoice.products.items array exists by using optional chaining (?.). 
      If it does, it uses the reduce method to iterate over each item in the array and accumulate 
      the amount property of each item into the totalAmount variable.
  
      Finally, the setTotal function is called with the totalAmount value to update the state of the component.
  
      This code demonstrates the use of the reduce method to perform a calculation on an array 
      and how to update the state of a React component using the setTotal function.
    */
  useEffect(() => {
    let totalAmount = 0;

    if (invoice?.products?.items) {
      const items = invoice.products.items;
      totalAmount = items.reduce(
        (accumulator, currentAmount) => accumulator + currentAmount.amount,
        0
      );
      setTotal(totalAmount);
      setNewInvoice({
        ...invoice,
        products: {
          ...invoice.products,
          totalAmount: totalAmount,
        },
      });
    }
  }, [invoice.products.items, setTotal]);

  /**
   * This function updates the client data in the invoice.
   * @param {string} key - The property to update in the client object.
   * @param {string} value - The new value for the specified property.
   */
  const updateClient = (key, value) => {
    const updateClient = {
      ...invoice.client,
      [key]: value,
    };

    setNewInvoice({ ...invoice, client: updateClient });
  };

  /**
   * This function updates the date in the invoice.
   * @param {string} key - The property to update in the date object.
   * @param {string} value - The new value for the specified property.
   */
  const updateDate = (key, value) => {
    const updateDate = {
      ...invoice.date,
      [key]: value,
    };

    setNewInvoice({ ...invoice, date: updateDate });
  };

  /**
   * This function updates the notes in the invoice.
   * @param {string} value - The new value for the notes property.
   */
  const updateNotes = (value) => {
    console.log(value);
    setNewInvoice({ ...invoice, notes: value });
  };

  /**
   * Updates the selected client and invoice state based on the selected client ID.
   *
   * @param {Object} event - The event object that triggered the function call.
   * @param {string} event.target.value - The ID of the selected client.
   */
  const handleClientChange = (event) => {
    const clientId = event.target.value;
    const client = clients.find((client) => client._id === clientId);
    setSelectedClient(client);
    setClientName(client.clientName);
    setClientNip(client.clientNip);
    setClientRegon(client.clientRegon);
    setClientEmail(client.clientEmail);
    setClientPhone(client.clientPhone);
    setClientCity(client.clientCity);
    setClientPostal(client.clientPostal);
    setClientAddress(client.clientAddress);
    setNewInvoice({
      ...invoice,
      client: {
        clientName: client.clientName,
        clientNip: client.clientNip,
        clientRegon: client.clientRegon,
        clientEmail: client.clientEmail,
        clientPhone: client.clientPhone,
        clientCity: client.clientCity,
        clientPostal: client.clientPostal,
        clientAddress: client.clientAddress,
      },
    });
  };

  /**
    Adds an empty product item to the invoice's product list.
    @returns {void}
    */
  const handleAddCard = () => {
    setNewInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: [...invoice.products.items, {}],
      },
    });
  };

  /**
   * Handle changes to the input fields.
   *
   * @param {Object} event - The event object.
   * @param {string} event.target.name - The name of the input field that triggered the event.
   * @param {string} event.target.value - The value of the input field.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    const updateFunctions = {
      clientName: [setClientName, updateClient],
      clientNip: [setClientNip, updateClient],
      clientRegon: [setClientRegon, updateClient],
      clientEmail: [setClientEmail, updateClient],
      clientPhone: [setClientPhone, updateClient],
      clientCity: [setClientCity, updateClient],
      clientPostal: [setClientPostal, updateClient],
      clientAddress: [setClientAddress, updateClient],
      dueDate: [setDueDate, updateDate],
      invoiceDate: [setInvoiceDate, updateDate],
    };

    const [updateState, updateClientData] = updateFunctions[name];
    updateState(value);
    updateClientData(name, value);
  };
  /**
   * Updates the notes value and calls the updateNotes function.
   * @param {Object} event - The event object.
   * @param {string} event.target.value - The value of the input field.
   * @returns {void}
   */
  const handleChangeNotes = (event) => {
    const { value } = event.target;
    setNotes(value);
    updateNotes(value);
  };

  return (
    <div className="flex col">
      <div className="view flex flex-end">
        <div className="view w-50">
          <h1 className="fs-45 bold right">INVOICE</h1>
          <p className="fs-20 right">{invoice.invoiceNumber}</p>
          <div className="flex flex-end flex-ai gap-15">
            <p className="">Invoice Date:</p>
            <input
              type={"date"}
              name="invoiceDate"
              className="input input-date w-35 fs-11"
              value={invoiceDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-end flex-ai gap-15">
            <p className="">Due Date:</p>
            <input
              type={"date"}
              name="dueDate"
              className="input input-date w-35 fs-11"
              value={dueDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="view flex m-t">
        <div className="view w-50">
          <h2 className="fs-20 bold p-color">Your Company</h2>
          <input
            type={"text"}
            className="input"
            placeholder="Your Name"
            value={invoice.user.name}
          />
          <input
            type={"tel"}
            className="input"
            placeholder="Your Name"
            value={invoice.user.phone}
          />
          <input
            type={"email"}
            className="input"
            placeholder="Your Name"
            value={invoice.user.email}
          />
          <input
            type={"text"}
            className="input"
            placeholder="NIP"
            value={invoice.user.NIP}
          />
          <input
            type={"text"}
            className="input"
            placeholder="REGON"
            value={invoice.user.REGON}
          />
          <input
            type={"text"}
            className="input"
            placeholder="Company's Address"
            value={invoice.user.address.street}
          />
          <input
            type={"text"}
            className="input"
            placeholder="City, Postal Code"
            value={`${invoice.user.address.postalCode}, ${invoice.user.address.city}`}
          />
        </div>
        <div className="view w-50">
          <h2 className="fs-20 bold p-color">Bill to</h2>
          <div>
            {clients.length ? (
              <select
                className="custom-select"
                value={selectedClient}
                onChange={(event) => handleClientChange(event)}
              >
                <option value={""}>
                  {clientName ? invoice.client.clientName : "Select the client"}
                </option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            ) : (
              <div></div>
            )}
          </div>
          <input
            type={"tel"}
            name={"clientPhone"}
            className="input"
            placeholder="Client Phone"
            value={clientPhone}
            onChange={handleChange}
          />
          <input
            type={"email"}
            name={"clientEmail"}
            className="input"
            placeholder="Client Email"
            value={clientEmail}
            onChange={handleChange}
          />
          <input
            type={"text"}
            name={"clientNip"}
            className="input"
            placeholder="NIP"
            value={clientNip}
            onChange={handleChange}
          />
          <input
            type={"text"}
            name={"clientRegon"}
            className="input"
            placeholder="REGON"
            value={clientRegon}
            onChange={handleChange}
          />
          <input
            type={"text"}
            name={"clientAddress"}
            className="input"
            placeholder="Company's Address"
            value={clientAddress}
            onChange={handleChange}
          />
          <div className="flex w-98">
            <input
              type={"text"}
              name={"clientPostal"}
              className="input w-40"
              placeholder="Postal"
              value={clientPostal}
              onChange={handleChange}
            />
            <input
              type={"text"}
              name={"clientCity"}
              className="input"
              placeholder="City"
              value={clientCity}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {invoice.products.items.map((product, index) => (
        <ProductCard
          key={index}
          index={index}
          product={product}
          invoice={invoice}
          setNewInvoice={setNewInvoice}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
          products={products}
        />
      ))}
      <div className="flex">
        <div className="view p-4-8 w-50">
          <button className="circle-button" onClick={handleAddCard}>
            +
          </button>
        </div>
      </div>
      <div className="mt-20">
        <span className="span bold">Notes</span>
        <textarea
          name={"notes"}
          className="input w-100 h-50 t-area"
          value={notes}
          onChange={handleChangeNotes}
        ></textarea>
      </div>
    </div>
  );
};

export default InvoiceInputs;
