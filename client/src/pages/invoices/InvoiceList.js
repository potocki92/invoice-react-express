import { Container, CardWrapper, ProductName } from "./InvoiceList.styled";

export const InvoiceList = ({ id, invoices, onDelete }) => {
  return (
    <Container>
      {invoices?.map((invoice, index) => (
        <CardWrapper key={index}>
          <ProductName>
            <div>
              <p>Invoice:</p>
              {invoice.invoiceName}
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
