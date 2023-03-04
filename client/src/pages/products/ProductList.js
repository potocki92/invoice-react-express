import { Container, CardWrapper, ProductName } from "./ProductList.styled";

export const ProductList = ({ id, products, onDelete }) => {
  return (
    <Container>
      {products?.map((product, index) => (
        <CardWrapper key={index}>
          <ProductName>
            <div>
              <p>product:</p>
              {product.productsName}
            </div>
            <div>
              <p>qty:</p>
              {product.qty}
            </div>
            <div>
              <p>price:</p>
              {product.productsPrice}
            </div>
          </ProductName>
          <button className="button" onClick={() => onDelete(product._id)}>
            Delete
          </button>
        </CardWrapper>
      ))}
    </Container>
  );
};
