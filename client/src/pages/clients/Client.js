import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ClientList } from "./ClientList";

const Client = () => {
  let { id } = useParams();
  const [newClient, setNewClient] = useState({
    _id: Types.ObjectId(),
    clientName: "",
    clientNip: "",
    clientRegon: "",
    clientEmail: "",
    clientPhone: "",
    clientCity: "",
    clientPostal: "",
    clientAddress: "",
  });
  const [allClients, setAllClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(allClients));
  }, [allClients]);
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

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`/${id}/addClient`, newClient)
      .then((res) => {
        console.log(res.data);
        setAllClients([...allClients, newClient]);
        setNewClient({
          _id: Types.ObjectId(),
          clientName: "",
          clientNip: "",
          clientRegon: "",
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
    <div className="container">
      <div className="invoice__home-logo">
        <h1>Customers</h1>
        {allClients && <p>There are total {allClients.length} clients</p>}
      </div>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>

      <form className="details__box" onSubmit={(e) => handleClick(e)}>
        <div className="form__group">
          <p>Name</p>
          <input
            type={"text"}
            name={"clientName"}
            value={newClient.clientName}
            onChange={handleChange}
            placeholder={"Enter Client Name"}
            required
          ></input>
        </div>
        <div className="form__group">
          <p>Nip</p>
          <input
            type={"text"}
            name={"clientNip"}
            value={newClient.clientNip}
            onChange={handleChange}
            placeholder={"Enter Client Nip"}
            required
          ></input>
        </div>
        <div className="form__group">
          <p>Regon</p>
          <input
            type={"text"}
            name={"clientRegon"}
            value={newClient.clientRegon}
            onChange={handleChange}
            placeholder={"Enter Client REGON"}
          ></input>
        </div>
        <div className="form__group">
          <p>Email</p>
          <input
            type={"email"}
            name={"clientEmail"}
            value={newClient.clientEmail}
            onChange={handleChange}
            placeholder={"Enter Client Email"}
          ></input>
        </div>
        <div className="form__group">
          <p>Phone</p>
          <input
            type={"tel"}
            name={"clientPhone"}
            value={newClient.clientPhone}
            onChange={handleChange}
            placeholder={"Enter Client Phone"}
          ></input>
        </div>
        <div className="form__group">
          <p>City</p>
          <input
            type={"text"}
            name={"clientCity"}
            value={newClient.clientCity}
            onChange={handleChange}
            placeholder={"Enter Client City"}
            required
          ></input>
        </div>
        <div className="form__group">
          <p>Postal</p>
          <input
            type={"text"}
            name={"clientPostal"}
            value={newClient.clientPostal}
            onChange={handleChange}
            placeholder={"Enter Client Postal"}
            required
          ></input>
        </div>
        <div className="form__group">
          <p>Address</p>
          <input
            type={"text"}
            name={"clientAddress"}
            value={newClient.clientAddress}
            onChange={handleChange}
            placeholder={"Enter Client Address"}
            required
          ></input>
        </div>
        <button className="button mark__as-btn" type="submit">
          Click
        </button>
      </form>

      <ClientList id={id} clients={allClients} onDelete={deleteClient} />
    </div>
  );
};

export default Client;
