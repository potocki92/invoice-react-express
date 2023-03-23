import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CurrentMonthInvoices from "../currentMonthIvoices";
import InvoicePDF from "../../components/InvoicePDF/InvoicePDF";
import ProductCard from "../../components/ProductCard/ProductCard";

const Invoices = () => {
  let { id } = useParams();

  const [newInvoice, setNewInvoice] = useState({
    _id: Types.ObjectId(),
    invoiceNumber: "",
    user: { address: {} },
    client: {},
    products: [],
    date: { dueDate: "", invoiceDate: "" },
  });
  const [user, setUser] = useState({});
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
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
    if (!newInvoice.invoiceNumber) {
      return false;
    }
    return true;
  };
  // Load user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/${id}/user`);
        setUser(response.data);
        setNewInvoice((prevInvoice) => ({
          ...prevInvoice,
          user: response.data,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);
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
    <div className="container section is-flex col">
      <div className="details__box">
        <div className="invoice__home-logo">
          <h1>Invoice</h1>
          {allInvoices && <p>There are total {allInvoices.length} invoices</p>}
          <Link to={`/${id}`}>
            <button className="button back_button">Go Back</button>
          </Link>
        </div>
      </div>
      <InvoicePDF
        invoice={newInvoice}
        setNewInvoice={setNewInvoice}
        handleChange={handleChange}
        clients={clients}
        products={products}
        selectedClient={selectedClient}
        selectedProduct={selectedProduct}
        selectedProductIndex={selectedProductIndex}
        handleClientChange={handleClientChange}
      />

      <button className="button mark__as-btn" onClick={handleClick}>
        Create Invoice
      </button>
    </div>
  );
};

export default Invoices;
