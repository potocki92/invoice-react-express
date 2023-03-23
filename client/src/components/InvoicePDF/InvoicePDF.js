import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "./InvoicePDF.css";
import ProductCard from "../ProductCard/ProductCard";

// TODO:
// GENEROWANIE PDF

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
  selectedClient,
  selectedProduct,
  selectedProductIndex,
  handleClientChange,
  handleProductChange,
  handleChange,
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

  const [cards, setCards] = useState([]);

  const handleRemoveCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };
  const handleAddCard = () => {
    setCards([...cards, {}]);
    setNewInvoice({ ...invoice, products: [...invoice.products, {}] });
  };

  return (
    <div className="page invoice-wrapper">
      <div className="view flex flex-end">
        <div className="view w-50">
          <h1 className="fs-45 bold right">INVOICE</h1>
          <p className="fs-20 right">{invoice.invoiceNumber}</p>
          <div className="flex flex-end">
            <p className="">Due Date:</p>
            <p className="p-10">{invoice.date.invoiceDate || ""}</p>
          </div>
          <div className="flex flex-end">
            <p className="">Invoice Date:</p>
            <p className="p-10">{invoice.date.dueDate}</p>
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
            value={`${invoice.user.address.city}, ${invoice.user.address.postalCode}`}
          />
        </div>
        <div className="view w-50">
          <h2 className="fs-20 bold p-color">Bill to</h2>
          <div>
            {clients.length ? (
              <select
                className="custom-select"
                value={selectedClient}
                onChange={handleClientChange}
              >
                <option value={""}>Select the client</option>
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
            type={"text"}
            className="input"
            placeholder="Client Name"
            value={invoice.client.clientName}
            onChange={handleChange}
          />
          <input
            type={"tel"}
            className="input"
            placeholder="Client Phone"
            value={invoice.client.clientPhone}
            onChange={handleChange}
          />
          <input
            type={"email"}
            className="input"
            placeholder="Client Email"
            value={invoice.client.clientEmail}
            onChange={handleChange}
          />
          <input
            type={"text"}
            className="input"
            placeholder="NIP"
            value={invoice.client.clientNip}
            onChange={handleChange}
          />
          <input
            type={"text"}
            className="input"
            placeholder="REGON"
            value={invoice.client.clientRegon}
            onChange={handleChange}
          />
          <input
            type={"text"}
            className="input"
            placeholder="Company's Address"
            value={invoice.client.clientAddress}
            onChange={handleChange}
          />
          <input
            type={"text"}
            className="input"
            placeholder="City"
            value={`${invoice.client.clientCity}, ${invoice.client.clientPostal}`}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="view mt-30 bg-dark flex flex-ai">
        <div className="view w-48 p-4-8">
          <span className="span white bold">Item Description</span>
        </div>
        <div className="view w-17 p-4-8">
          {" "}
          <div className="view w-48 p-4-8">
            <span className="span white bold">Qty</span>
          </div>
        </div>
        <div className="view w-17 p-4-8">
          {" "}
          <div className="view w-48 p-4-8">
            <span className="span white bold">Rate</span>
          </div>
        </div>
        <div className="view w-18 p-4-8">
          {" "}
          <div className="view w-48 p-4-8">
            <span className="span white bold">Amount</span>
          </div>
        </div>
      </div>

      {cards.map((card, index) => (
        <ProductCard
          key={index}
          index={index}
          invoice={invoice}
          setNewInvoice={setNewInvoice}
          handleChange={handleChange}
          selectedProduct={selectedProduct}
          selectedProductIndex={selectedProductIndex}
          products={products}
          handleProductChange={handleProductChange}
          handleRemoveCard={handleRemoveCard}
        />
      ))}
      <button className="circle-button" onClick={handleAddCard}>
        +
      </button>
      <div className="view"></div>
      <div className="view"></div>
      <button className="button" onClick={generatePdf}>
        Generate PDF
      </button>
    </div>
  );
};

export default InvoicePDF;
