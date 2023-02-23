import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ClientList } from "./ClientList";
import { clientFormFields } from "./inputClient";
import markup from "../../markup/inputs";

const Client = () => {
  let { id } = useParams();
  const [newClient, setNewClient] = useState({
    _id: Types.ObjectId(),
    clientName: "",
    clientNip: 0,
    clientRegon: 0,
    clientEmail: "",
    clientPhone: "",
    clientCity: "",
    clientPostal: "",
    clientAddress: "",
  });
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`/${id}/clients`);
        setAllClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleClick = () => {
    axios
      .post(`/${id}/addClient`, newClient)
      .then((res) => {
        console.log(res.data);
        setAllClients([...allClients, newClient]);
        setNewClient({
          _id: Types.ObjectId(),
          clientName: "",
          clientNip: 0,
          clientRegon: 0,
          clientEmail: "",
          clientPhone: "",
          clientCity: "",
          clientPostal: "",
          clientAddress: "",
        });
      })
      .catch((err) => console.error(err));
  };

  const deleteClient = (clientId) => {
    axios
      .delete(`/${id}/clients/${clientId}`)
      .then((res) => {
        console.log(res.data);
        setAllClients(allClients.filter((client) => client._id !== clientId));
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
        {clientFormFields.map((item) => markup(item, handleChange))}
      </div>

      <button className="button mark__as-btn" onClick={handleClick}>
        Click
      </button>
      <ClientList id={id} clients={allClients} onDelete={deleteClient} />
    </div>
  );
};

export default Client;
