import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { InvoiceList } from "./InvoiceList";
import moment from "moment";

const Invoices = () => {
  let { id } = useParams();

  const [newInvoice, setNewInvoice] = useState({
    _id: Types.ObjectId(),
    invoiceNumber: "",
  });
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  // Load all invoices to setAllInvoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const responseInvoice = await axios.get(`/${id}/invoices`);
        setAllInvoices(responseInvoice.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [id]);
  // Generate Invoice Number INV-MM/YY/NN
  const generateInvoiceNumber = (currentMonthInvoices) => {
    const month = moment().format("MM"); // actual month in format MM
    const year = moment().format("YY"); // actual year in format YY

    let number = currentMonthInvoices + 1; // number of invoice is an another number in actual month
    number = number < 10 ? `0${number}` : number; // add '0' before number of invoice

    return `INV-${month}/${year}/${number}`; // return number of invoice in INV-MM/YY/NN format
  };

  const fetchCurrentMonthInvoices = () => {
    const month = moment().format("MM");
    axios.get(`/${id}/invoices?month=${month}`).then((res) => {
      setCurrentMonthInvoices(res.data.length);
    });
  };
  useEffect(() => {
    fetchCurrentMonthInvoices();
    const invoiceNumber = generateInvoiceNumber(currentMonthInvoices);
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, invoiceNumber }));
  }, [currentMonthInvoices]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleClick = () => {
    const invoiceNumber = generateInvoiceNumber(currentMonthInvoices);
    axios
      .post(`/${id}/addInvoice`, { ...newInvoice, invoiceNumber })
      .then((res) => {
        console.log(res.data);
        setAllInvoices([...allInvoices, newInvoice]); // aktualizujemy stan listy produktów
        setNewInvoice({
          _id: Types.ObjectId(), // wygeneruj nowe ID
          invoiceNumber: "",
        }); // resetujemy dane dotyczące produktu
        setCurrentMonthInvoices(currentMonthInvoices + 1);
      })
      .catch((err) => console.error(err));
  };
  const deleteProduct = (invoiceId) => {
    axios
      .delete(`/${id}/invoices/${invoiceId}`)
      .then((res) => {
        console.log(res.data);
        setAllInvoices(
          allInvoices.filter((product) => product._id !== invoiceId)
        );
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="main__container">
      <div className="invoice__home-logo">
        <h1>Invoice</h1>
        <p>There are total 7 invoices</p>
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

      <button className="button mark__as-btn" onClick={handleClick}>
        Click
      </button>
      <InvoiceList id={id} invoices={allInvoices} onDelete={deleteProduct} />
    </div>
  );
};

export default Invoices;
