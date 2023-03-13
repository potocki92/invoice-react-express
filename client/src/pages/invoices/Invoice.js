import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CurrentMonthInvoices from "../currentMonthIvoices";

const Invoices = () => {
  let { id } = useParams();

  const [newInvoice, setNewInvoice] = useState({
    _id: Types.ObjectId(),
    invoiceNumber: "",
    client: {},
    products: [],
    date: { dueDate: "", invoiceDate: "" },
  });
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    if (
      newInvoice.invoiceNumber === "" ||
      Object.keys(newInvoice.client).length === 0 ||
      newInvoice.products.length === 0 ||
      Object.keys(newInvoice.date).length === 0
    ) {
      return false;
    }
    return true;
  };

  // Load all clients ro setClients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`/${id}/clients`);
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, [id]);

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

  // Generate Invoice Number INV-MM/YY/NN
  const invoiceNumber = new CurrentMonthInvoices(
    currentMonthInvoices
  ).generateInvoiceNumber(currentMonthInvoices);

  useEffect(() => {
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, invoiceNumber }));
  }, [currentMonthInvoices]);
  // Handle to client
  const handleClientChange = (event) => {
    const clientId = event.target.value;
    const client = clients.find((client) => client._id === clientId);
    setSelectedClient(client);
    setNewInvoice({
      ...newInvoice,
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

  // Handle to product
  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((product) => product._id === productId);
    setSelectedProduct(product);
    setNewInvoice({
      ...newInvoice,
      products: [
        ...newInvoice.products,
        {
          productsName: product.productsName,
          productsQty: product.qty,
          productsPrice: product.productsPrice,
        },
      ],
    });
  };

  // Load all invoices to setAllInvoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const responseInvoice = await axios.get(`/${id}/invoices`);
        setAllInvoices(responseInvoice.data);
        setCurrentMonthInvoices(responseInvoice.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, event.target.value);
    if (name.includes("product")) {
      setNewInvoice({
        ...newInvoice,
        products: {
          ...newInvoice.products,
          [name]: value,
        },
      });
    } else if (name.includes("client")) {
      setNewInvoice({
        ...newInvoice,
        client: {
          ...newInvoice.client,
          [name]: value,
        },
      });
    } else if (name.includes("dueDate") || name.includes("invoiceDate")) {
      setNewInvoice({
        ...newInvoice,
        date: {
          ...newInvoice.date,
          [name]: value,
        },
      });
    } else {
      setNewInvoice({ ...newInvoice, [name]: value });
    }
  };

  const handleClick = () => {
    if (isFormValid) {
      axios
        .post(`/${id}/addInvoice`, { ...newInvoice, invoiceNumber })
        .then((res) => {
          console.log(res.data);
          setAllInvoices([...allInvoices, newInvoice]); // aktualizujemy stan listy produktów
          setNewInvoice({
            _id: Types.ObjectId(), // wygeneruj nowe ID
            invoiceNumber: "",
            client: {
              clientName: "",
              clientNip: "",
              clientRegon: "",
              clientEmail: "",
              clientPhone: "",
              clientCity: "",
              clientPostal: "",
              clientAddress: "",
            },
            products: [],
            date: {
              dueDate: "",
              invoiceDate: "",
            },
          }); // resetujemy dane dotyczące produktu
          setCurrentMonthInvoices(currentMonthInvoices + 1);
        })
        .catch((err) => console.error(err));
    } else {
      alert("Wypełnij wszystkie pola formularza.");
    }
  };

  // Remove products from invoices
  const handleRemoveProduct = (index) => {
    const updateProducts = [...newInvoice.products];
    updateProducts.splice(index, 1);
    setNewInvoice({
      ...newInvoice,
      products: updateProducts,
    });
  };
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [newInvoice]);

  return (
    <div className="main__container">
      <div className="invoice__home-logo">
        <h1>Invoice</h1>
        {allInvoices && <p>There are total {allInvoices.length} invoices</p>}
      </div>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>

      <div className="details__box">
        <div className="form__group">
          <p>Invoice Number</p>
          <input
            type="text"
            name="invoiceNumber"
            value={newInvoice.invoiceNumber}
            readOnly
          />
        </div>
      </div>

      <div className="details__box">
        {clients.length ? (
          <select value={selectedClient} onChange={handleClientChange}>
            <option value={""}>Select the client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.clientName}
              </option>
            ))}
          </select>
        ) : (
          <div>------</div>
        )}
      </div>
      <div className="details__box">
        <div className="form__group">
          <label htmlFor="clientName">Client name:</label>
          <input
            type={"text"}
            id="clientName"
            name="clientName"
            value={newInvoice.client.clientName}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientNip">Client NIP:</label>
          <input
            type={"text"}
            id="clientNip"
            name="clientNip"
            value={newInvoice.client.clientNip}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientRegon">Client REGON:</label>
          <input
            type={"text"}
            id="clientRegon"
            name="clientRegon"
            value={newInvoice.client.clientRegon}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientEmail">Client email:</label>
          <input
            type={"email"}
            id="clientEmail"
            name="clientEmail"
            value={newInvoice.client.clientEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientPhone">Client phone:</label>
          <input
            type={"tel"}
            id="clientPhone"
            name="clientPhone"
            value={newInvoice.client.clientPhone}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientCity">Client city:</label>
          <input
            type={"text"}
            id="clientCity"
            name="clientCity"
            value={newInvoice.client.clientCity}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientPostal">Client postal:</label>
          <input
            type={"text"}
            id="clientPostal"
            name="clientPostal"
            value={newInvoice.client.clientPostal}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="clientAddress">Client address:</label>
          <input
            type={"text"}
            id="clientAddress"
            name="clientAddress"
            value={newInvoice.client.clientAddress}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="details__box">
        {products.length ? (
          <select value={selectedProduct} onChange={handleProductChange}>
            <option value={""}>Select the product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productsName}
              </option>
            ))}
          </select>
        ) : (
          <div>------</div>
        )}
      </div>
      {newInvoice.products.map((product, index) => (
        <div className="details__box" key={index}>
          {console.log(product, index)}
          <div className="form__group">
            <label htmlFor="productsName">Product name:</label>
            <input
              type={"text"}
              id="productsName"
              name="productsName"
              value={product.productsName}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="productsQty">Qty:</label>
            <input
              type={"number"}
              id="productsQty"
              name="productsQty"
              value={product.productsQty}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="productsPrice">Price:</label>
            <input
              type={"number"}
              id="productsPrice"
              name="productsPrice"
              value={product.productsPrice}
              onChange={handleChange}
            />
          </div>
          <button className="button" onClick={() => handleRemoveProduct(index)}>
            Remove
          </button>
        </div>
      ))}
      <div className="details__box details__box-wrapper">
        <p>Invoice Details</p>
        <div className="form__group">
          <p>Invoice Date</p>
          <input
            type="date"
            name="invoiceDate"
            value={newInvoice.date.invoiceDate}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <p>Due Date</p>
          <input
            type="date"
            name="dueDate"
            value={newInvoice.date.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="button mark__as-btn" onClick={handleClick}>
        Click
      </button>
    </div>
  );
};

export default Invoices;
