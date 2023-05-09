import React, { useEffect, useState } from "react";
/*
  Document, Page, Text, View, StyleSheet, and pdf: These are components and functions provided by the "@react-pdf/renderer" package used for generating a PDF document in a React application.
*/
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver"; // This is a function provided by the "file-saver" package used to save a file from a Blob object. In this code, it is used to save the generated PDF document.
import "./InvoicePDF.css";
import ProductCard from "../ProductCard/ProductCard";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    background: "#fff",
    padding: "40px 35px",
    boxShadow: "0 0 17px 0 rgba(16,40,73,.09)",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  flexMt40: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
  },
  flexMb5: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  w50: {
    width: "50%",
  },
  w55: {
    width: "55%",
  },
  w40: {
    width: "40%",
  },
  w45: {
    width: "45%",
  },
  w60: {
    width: "60%",
  },
  text40: {
    width: "98%",
    padding: "4px 12px 4px 0",
    marginBottom: "1px",
    fontWeight: "bold",
    fontSize: 45,
    color: "#555",
    textAlign: "right",
  },
  text20: {
    width: "98%",
    padding: "4px 12px 4px 0",
    marginBottom: "1px",
    fontWeight: "bold",
    fontSize: 20,
    color: "#555",
  },
  text14: {
    width: "98%",
    padding: "4px 12px 4px 0",
    marginBottom: "1px",
    fontWeight: "bold",
    fontSize: 14,
    color: "#555",
  },
  text14Dark: {
    color: "#222",
  },
  text20Right: {
    width: "98%",
    padding: "4px 12px 4px 0",
    marginBottom: "1px",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "right",
    color: "#555",
  },
});

const InvoicePDF = ({
  invoice,
  setNewInvoice,
  clients,
  products,
  selectedProduct,
  selectedProductIndex,
}) => {
  const generatePdf = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.flex}>
            <View style={styles.w50}>
              <Text style={styles.text20}>Your Company</Text>
              <Text style={styles.text14}>{invoice.user.name}</Text>
              <Text style={styles.text14}>{invoice.user.email}</Text>
              <Text style={styles.text14}>{invoice.user.phone}</Text>
              <Text style={styles.text14}>{invoice.user.NIP}</Text>
              <Text style={styles.text14}>{invoice.user.REGON}</Text>
              <Text style={styles.text14}>{invoice.user.address.city}</Text>
              <Text style={styles.text14}>
                {invoice.user.address.postalCode}
              </Text>
              <Text style={styles.text14}>{invoice.user.address.street}</Text>
            </View>
            <View style={styles.w50}>
              <Text style={styles.text40}>INVOICE</Text>
              <Text style={styles.text20Right}>{invoice.invoiceNumber}</Text>
              <View style={styles.flexMb5}>
                <Text style={styles.text14}>
                  Invoice Date: {invoice.date.invoiceDate}
                </Text>
              </View>
              <View style={styles.flexMb5}>
                <Text style={styles.text14}>
                  Due Date: {invoice.date.dueDate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.flexMt40}>
            <View style={styles.w55}>
              <Text style={styles.text14Dark}>Bill to:</Text>
              <Text style={styles.text14}>{invoice.client.clientName}</Text>
              <Text style={styles.text14}>{invoice.client.clientPhone}</Text>
              <Text style={styles.text14}>{invoice.client.clientEmail}</Text>
              <Text style={styles.text14}>{invoice.client.clientNip}</Text>
              <Text style={styles.text14}>{invoice.client.clientRegon}</Text>
              <Text style={styles.text14}>{invoice.client.clientCity}</Text>
              <Text style={styles.text14}>{invoice.client.clientPostal}</Text>
              <Text style={styles.text14}>{invoice.client.clientAddress}</Text>
            </View>
            <View style={styles.w45}></View>
          </View>
          <View
            style={{
              marginTop: "30",
              backgroundColor: "#666",
              display: "flex",
              flexDirection: "row",
              fontSize: "14",
            }}
          >
            <View style={{ width: "48%", padding: "4px 8px" }}>
              <Text style={{ color: "white" }}>Item Description</Text>
            </View>
            <View style={{ width: "17%", padding: "4px 8px" }}>
              <Text style={{ color: "white", textAlign: "right" }}>Qty</Text>
            </View>
            <View style={{ width: "17%", padding: "4px 8px" }}>
              <Text style={{ color: "white", textAlign: "right" }}>Rate</Text>
            </View>
            <View style={{ width: "18%", padding: "4px 8px" }}>
              <Text style={{ color: "white", textAlign: "right" }}>Amount</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #e3e3e3",
            }}
          >
            <View style={{ width: "48%", padding: "4px 8px 10px 0" }}>
              <Text style={styles.text14}>{}</Text>
            </View>
            <View style={{ width: "17%", padding: "4px 5px 10px 0" }}>
              <Text
                style={{
                  textAlign: "right",
                  width: "98%",
                  padding: "4px 0 4px 0",
                  marginBottom: "1px",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#555",
                }}
              >
                {}
              </Text>
            </View>
            <View style={{ width: "17%", padding: "4px 5px 10px 0" }}>
              <Text
                style={{
                  textAlign: "right",
                  width: "98%",
                  padding: "4px 0 4px 0",
                  marginBottom: "1px",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#555",
                }}
              >
                {}
              </Text>
            </View>
            <View style={{ width: "18%", padding: "4px 0 10px 0" }}>
              <Text
                style={{
                  textAlign: "right",
                  width: "98%",
                  padding: "4px 12px 4px 0",
                  marginBottom: "1px",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#555",
                }}
              >
                {}
              </Text>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: "50%", marginTop: "10" }}></View>
            <View style={{ width: "50%", marginTop: "20" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "50%", padding: "5" }}>
                  <Text
                    style={{
                      width: "98%",
                      padding: "4px 0 4px 0",
                      marginBottom: "1px",
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    1
                  </Text>
                </View>
                <View style={{ width: "50%", padding: "5 0" }}>
                  <Text
                    style={{
                      textAlign: "right",
                      width: "98%",
                      padding: "4px 12px 4px 0",
                      marginBottom: "1px",
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    4500
                  </Text>
                </View>
              </View>
              <View style={{ display: "flex" }}>{/* TAX */}</View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#e3e3e3",
                  padding: 5,
                }}
              >
                <View style={{ width: "50%", padding: 5 }}>
                  <Text
                    style={{
                      width: "98%",
                      padding: "4px 0 4px 0",
                      marginBottom: "1px",
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    Total
                  </Text>
                </View>
                <View style={{ width: "50%", padding: 5, display: "flex" }}>
                  <Text
                    style={{
                      textAlign: "right",
                      width: "98%",
                      padding: "4px 0 4px 0",
                      marginBottom: "1px",
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    Zl
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      width: "98%",
                      padding: "4px 0 4px 0",
                      marginBottom: "1px",
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    4500
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
    const pdfBlob = await pdf(doc).toBlob();
    saveAs(pdfBlob, `${invoice.invoiceNumber}.pdf`);
  };

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
  console.log(clientCity);
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
      console.log(invoice.products);
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
  /*
    updateClient: 
    This is a function used to update the client details in the invoice. 
    It takes two arguments, key, and value, where key is the property of the client object to be updated and value is the new value for that property.
  */
  const updateClient = (key, value) => {
    const updateClient = {
      ...invoice.client,
      [key]: value,
    };

    setNewInvoice({ ...invoice, client: updateClient });
  };
  /*
    updateDate: 
    This is a function used to update the invoice date and due date in the invoice. 
    It takes two arguments, key, and value, where key is the property of the date object to be updated and value is the new value for that property.
  */
  const updateDate = (key, value) => {
    const updateDate = {
      ...invoice.date,
      [key]: value,
    };

    setNewInvoice({ ...invoice, date: updateDate });
  };

  /*
    handleClientChange: 
    This is a function used to handle the change in the selected client. 
    It sets the state of various client-related variables like "clientName", "clientNip", "clientRegon", etc., and also sets the selected client object.
  */
  const handleClientChange = (event) => {
    const clientId = event.target.value;
    const client = clients.find((client) => client._id === clientId);
    console.log(client);
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
  /*
    handleRemoveCard:
    This is a function used to remove a product items from the invoice. 
    It takes an index as an argument, removes the corresponding item from the "updateItems" array, and updates the state.
  */
  const handleRemoveCard = (index) => {
    const updateItems = [...invoice.products.items];
    updateItems.splice(index, 1);
    console.log(updateItems);
    setNewInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: updateItems,
      },
    });
  };
  /*
    handleAddCard: 
    This is a function used to add a new product card to the invoice. 
    It adds an empty object to the "cards" array and updates the state.
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

  /*
    handleChange: 
    This function takes an event object as its input, which is typically generated by a user interacting with a form element. 
    It extracts the name and value properties from the target property of the event object, which represents the form element that was interacted with.

    Then, it checks the name property to determine which input field was updated, and calls the appropriate setter function to update the state with the new value. 
    It also calls either the updateClient or updateDate function (depending on which field was updated) with the updated name and value to update the parent component's state.

    Overall, this function is responsible for updating the state of the component with the new values entered by the user, and propagating those changes up to the parent component.
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

  return (
    <>
      <div className="page invoice-wrapper">
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
                    {clientName
                      ? invoice.client.clientName
                      : "Select the client"}
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
        <div className="view mt-30 bg-dark flex flex-ai">
          <div className="view w-25 p-4-8">
            <span className="span white bold">Item Description</span>
          </div>
          <div className="view w-22 p-4-8 flex">
            <div className="view w-50 p-4-8">
              <span className="span white bold right">Qty</span>
            </div>
            <div className="view w-50 p-4-8">
              <span className="span white bold right">Tax</span>
            </div>
          </div>
          <div className="view w-35 p-4-8 flex">
            <div className="view w-50 p-4-8">
              <span className="span white bold right">Rate</span>
            </div>
            <div className="view w-50 p-4-8">
              <span className="span white bold right">Tax Rate</span>
            </div>
          </div>
          <div className="view w-18 p-4-8">
            <span className="span white bold right">Amount</span>
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
          <div className="view w-50 m-t">
            <div className="flex">
              <div className="w-50 p-5">
                <span className="span">Sub Total</span>
              </div>
              <div className="w-50 p-5">
                <span class="span right bold dark">{`${total}.00`}</span>
              </div>
            </div>
            <div className="flex">
              <div className="w-50 p-5">
                <span className="span">Sale Tax (10%)</span>
              </div>
              <div className="w-50 p-5">
                <span class="span right bold dark">{`${total}.00`}</span>
              </div>
            </div>
            <div className="view flex bg-gray p-5">
              <div className="view w-50 p-5">
                <span className="span bold">TOTAL</span>
              </div>
              <div className="view w-50 p-5 flex">
                <span className="span bold dark right">$</span>
                <span className="span right bold dark">{`${total}.00`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <span className="span bold">Notes</span>
          <textarea className="input w-100 h-50 t-area">
            It was great doing business with you.
          </textarea>
        </div>
        <button className="button" onClick={generatePdf}>
          Generate PDF
        </button>
      </div>

      <Page size="A4" className="page invoice-wrapper">
        <View className="view flex flex-end">
          <View className="view w-50 flex column">
            <Text className="fs-45 bold right">INVOICE</Text>
            <Text className="fs-20 right">{invoice.invoiceNumber}</Text>
            <View className="flex flex-end flex-ai gap-15">
              <Text className="w-35 fs-11" style={styles.text14}>
                Invoice Date: {invoice.date.invoiceDate}
              </Text>
            </View>
            <View className="flex flex-end flex-ai gap-15">
              <Text className="w-35 fs-11" style={styles.text14}>
                Due Date: {invoice.date.dueDate}
              </Text>
            </View>
          </View>
        </View>
        <View className="view flex m-t">
          <View className="view w-50 flex column">
            <Text className="fs-20 bold p-color">Your Company</Text>
            <Text style={styles.text14}>{invoice.user.name}</Text>
            <Text style={styles.text14}>{invoice.user.phone}</Text>
            <Text style={styles.text14}>{invoice.user.email}</Text>
            <Text style={styles.text14}>{invoice.user.NIP}</Text>
            <Text style={styles.text14}>{invoice.user.REGON}</Text>
            <Text style={styles.text14}>{invoice.user.address.street}</Text>
            <Text style={styles.text14}>
              {invoice.user.address.postalCode}, {invoice.user.address.city}
            </Text>
          </View>
          <View className="view w-50">
            <View className="view w-50 flex column">
              <Text className="fs-20 bold p-color">Bill to</Text>
              <Text style={styles.text14}>{invoice.client.clientName}</Text>
              <Text style={styles.text14}>{clientPhone}</Text>
              <Text style={styles.text14}>{clientEmail}</Text>
              <Text style={styles.text14}>{clientNip}</Text>
              <Text style={styles.text14}>{clientRegon}</Text>
              <Text style={styles.text14}>{clientAddress}</Text>
              {clientPostal && clientCity && (
                <Text style={styles.text14}>
                  {clientPostal}, {clientCity}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View className="view mt-30 bg-dark flex flex-ai">
          <View className="view w-25 p-4-8">
            <Text className="span white bold">Item Description</Text>
          </View>
          <View className="view w-22 p-4-8 flex">
            <View className="view w-50 p-4-8">
              <Text className="span white bold right">Qty</Text>
            </View>
            <View className="view w-50 p-4-8">
              <Text className="span white bold right">Tax</Text>
            </View>
          </View>
          <View className="view w-35 p-4-8 flex">
            <View className="view w-50 p-4-8">
              <Text className="span white bold right">Rate</Text>
            </View>
            <View className="view w-50 p-4-8">
              <Text className="span white bold right">Tax Rate</Text>
            </View>
          </View>
          <View className="view w-18 p-4-8">
            <Text className="span white bold right">Amount</Text>
          </View>
        </View>

        {invoice.products.items.map(
          (product) => (
            console.log(product),
            (
              <View className="view row flex b-b p-10 flex-align relative">
                <View className="view w-25 p-4-8 flex-align flex">
                  <Text className="">{product.productsName}</Text>
                </View>
                <View className="view w-22 p-4-8 flex">
                  <View className="view w-50 p-4-8 pb-10">
                    <Text className="dark right p-0">
                      {product.productsQty}
                    </Text>
                  </View>
                  <View className="view w-50 p-4-8 pb-10">
                    <Text className="dark right p-0">
                      {product.productsTax?.name || "0%"}
                    </Text>
                  </View>
                </View>
                <View className="view w-35 p-4-8 flex">
                  <View className="view w-50 p-4-8 pb-10">
                    <Text className="dark right p-0">
                      {product.productsPrice}
                    </Text>
                  </View>
                  <View className="view w-50 p-4-8 pb-10">
                    <Text className="dark right p-0">
                      {product.productsRateTax || 0}
                    </Text>
                  </View>
                </View>
                <View className="view w-18 p-4-8 pb-10 right">
                  <Text className="span dark">{product.amount}</Text>
                </View>
              </View>
            )
          )
        )}
        <View className="flex">
          <View style={{ width: "50%", marginTop: "10" }}></View>
          <View style={{ width: "50%", marginTop: "20" }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ width: "50%", padding: "5" }}>
                <Text
                  style={{
                    width: "98%",
                    padding: "4px 0 4px 0",
                    marginBottom: "1px",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#555",
                  }}
                >
                  1
                </Text>
              </View>
              <View style={{ width: "50%", padding: "5 0" }}>
                <Text
                  style={{
                    textAlign: "right",
                    width: "98%",
                    padding: "4px 12px 4px 0",
                    marginBottom: "1px",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#555",
                  }}
                >
                  4500
                </Text>
              </View>
            </View>
            <View style={{ display: "flex" }}>{/* TAX */}</View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#e3e3e3",
                padding: 5,
              }}
            >
              <View style={{ width: "50%", padding: 5 }}>
                <Text
                  style={{
                    width: "98%",
                    padding: "4px 0 4px 0",
                    marginBottom: "1px",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#555",
                  }}
                >
                  Total
                </Text>
              </View>
              <View style={{ width: "50%", padding: 5, display: "flex" }}>
                <Text
                  style={{
                    textAlign: "right",
                    width: "98%",
                    padding: "4px 0 4px 0",
                    marginBottom: "1px",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#555",
                  }}
                >
                  Zl
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    width: "98%",
                    padding: "4px 0 4px 0",
                    marginBottom: "1px",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#555",
                  }}
                >
                  4500
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </>
  );
};

export default InvoicePDF;
