import { Container, CardWrapper, ProductName } from "./InvoiceList.styled";

export const InvoiceList = ({ id, invoices, onDelete }) => {
  return (
    <Container>
      {invoices?.map((invoice, index) => (
        <CardWrapper key={index}>
          <ProductName>
            <div>
              <p>Invoice:</p>
              {invoice.invoiceNumber}
            </div>
            <div>
              <p>Client:</p>
              {invoice.client.clientName}
            </div>
            <div>
              <p>Invoice Date:</p>
              {invoice.date.invoiceDate}
            </div>
            <div>
              <p>Invoice Due:</p>
              {invoice.date.dueDate}
            </div>
          </ProductName>
          <button className="button" onClick={() => onDelete(invoice._id)}>
            Delete
          </button>
        </CardWrapper>
      ))}
    </Container>
  );
};
