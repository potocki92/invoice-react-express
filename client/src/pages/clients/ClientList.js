import { Container, CardWrapper, ClientName } from "./ClientList.styled";

export const ClientList = ({ id, clients, onDelete }) => {
  return (
    <Container>
      {clients?.map((client, index) => (
        <CardWrapper key={index}>
          <ClientName>
            <div>
              <p>client:</p>
              {client.clientName}
            </div>
            <div>
              <p>nip:</p>
              {client.clientNip}
            </div>
            <div>
              <p>regon:</p>
              {client.clientRegon}
            </div>
            <div>
              <p>email:</p>
              {client.clientEmail}
            </div>
            <div>
              <p>phone:</p>
              {client.clientPhone}
            </div>
            <div>
              <p>city:</p>
              {client.clientCity}
            </div>
            <div>
              <p>postal:</p>
              {client.clientPostal}
            </div>
            <div>
              <p>address:</p>
              {client.clientAddress}
            </div>
          </ClientName>
          <button className="button" onClick={() => onDelete(client._id)}>
            Delete
          </button>
        </CardWrapper>
      ))}
    </Container>
  );
};
