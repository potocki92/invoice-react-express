import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const InvoiceEdit = () => {
  let { id, invoiceId } = useParams();

  const [invoice, setInvoice] = useState({
    date: { dueDate: "", invoiceDate: "" },
    client: {
      clientName: "",
      clientNip: "",
      clientRegon: "",
      clientPhone: "",
      clientEmail: "",
      clientCity: "",
      clientPostal: "",
      clientAddress: "",
    },
    products: [],
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load invoice from database
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/${id}/invoice/${invoiceId}`);
        setInvoice(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoice();
  }, [id, invoiceId]);
  // Load all products to setProducts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/${id}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  // Change data from inputs
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
      client: { ...prevInvoice.client, [name]: value },
      products:
        index === undefined
          ? prevInvoice.products
          : prevInvoice.products.map((product, i) =>
              i === index ? { ...product, [name]: value } : product
            ),
    }));
  };
  // Remove products from invoices
  const handleRemoveProduct = (index) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      products: prevInvoice.products.filter((_, i) => i !== index),
    }));
  };
  // Handle to product
  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((product) => product._id === productId);
    setSelectedProduct(product);
  };
  // Added product when user select from products
  const handleAddProduct = () => {
    if (selectedProduct) {
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        products: [
          ...prevInvoice.products,
          {
            productsName: selectedProduct.productsName,
            productsQty: 1,
            productsPrice: selectedProduct.productsPrice,
          },
        ],
      }));
      setSelectedProduct(null);
    }
  };
  
  // Save all changed data
  const handleSave = async () => {
    try {
      const response = await axios.put(`/${id}/invoice/${invoiceId}`, invoice);
      console.log("Invoice updated successfully: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
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
            value={invoice.date.invoiceDate}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <p>Due Date</p>
          <input
            type="date"
            name="dueDate"
            value={invoice.date.dueDate}
            onChange={handleChange}
          />
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
              value={invoice.client.clientName}
              onChange={handleChange}
            />
          </div>
          <div className="details__box">
            <div className="form__group">
              <label htmlFor="clientNip">Client NIP:</label>
              <input
                type={"text"}
                id={"clientNip"}
                name="clientNip"
                value={invoice.client.clientNip}
                onChange={handleChange}
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
                value={invoice.client.clientRegon}
                onChange={handleChange}
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
                value={invoice.client.clientEmail}
                onChange={handleChange}
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
                value={invoice.client.clientPhone}
                onChange={handleChange}
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
                value={invoice.client.clientCity}
                onChange={handleChange}
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
                value={invoice.client.clientPostal}
                onChange={handleChange}
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
                value={invoice.client.clientAddress}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="details__box details__box-wrapper">
          <h2>Product</h2>
          {invoice.products.map((product, index) => (
            <div className="details__box" key={index}>
              <div className="form__group">
                <label htmlFor="productsName">Product Name:</label>
                <input
                  type={"text"}
                  id="productsName"
                  name="productsName"
                  value={product.productsName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="form__group">
                <label htmlFor="productsQty">Qty:</label>
                <input
                  type={"number"}
                  id="productsQty"
                  name="productsQty"
                  value={product.productsQty}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="form__group">
                <label htmlFor="productsPrice">Price:</label>
                <input
                  type={"number"}
                  id="productsPrice"
                  name="productsPrice"
                  value={product.productsPrice}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="form__group">
                <span>Amount: {product.amount}</span>
              </div>
              <button
                className="button"
                onClick={() => handleRemoveProduct(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="form__group">
          <label htmlFor="productSelect">Product:</label>
          <select id="productSelect" onChange={handleProductChange}>
            <option value="">-- Select a product --</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productsName}
              </option>
            ))}
          </select>
        </div>
        <div className="form__group">
          <button className="button add_button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
      <button className="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default InvoiceEdit;
