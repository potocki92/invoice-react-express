import { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ invoice, setNewInvoice, products, index }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQty, setProductQty] = useState(1);
  const [productPrice, setProductPrice] = useState(1);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct({
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
    });
    // kopia wszystich produktów z invoice
    const updateProduct = [...invoice.products];

    // update określonego produktu
    updateProduct[index] = {
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
    };
    // zapisanie zmiany produktu do invoice
    setNewInvoice({ ...invoice, products: updateProduct });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "productsQty") {
      setProductQty(value);
      const updatedProducts = invoice.products.map((product, i) => {
        if (i === index) {
          return {
            ...product,
            productsQty: value,
          };
        }
        return product;
      });
      setNewInvoice({ ...invoice, products: updatedProducts });
      console.log(invoice.products[index]);
    }
    if (name === "productsPrice") {
      setProductPrice(value);
      const updateProducts = invoice.products.map((product, i) => {
        if (i === index) {
          return {
            ...product,
            productsPrice: value,
          };
        }
        return product;
      });
      setNewInvoice({ ...invoice, products: updateProducts });
      console.log(updateProducts[index]);
    }
  };
  return (
    <div className="view row flex b-b flex-align">
      <div className="view w-48 p-4-8 flex-align">
        {products.length ? (
          <div>
            <select
              className="custom-select"
              value={selectedProduct._id}
              onChange={(event) => handleProductChange(event)}
            >
              <option value={""}>Select the product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productsName}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="view w-17 p-4-8 pb-10">
        <p className="white bold right">
          <input
            className="input dark right"
            name="productsQty"
            placeholder="1"
            value={productQty}
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="view w-17 p-4-8 pb-10 ">
        <input
          className="input dark right"
          name="productsPrice"
          placeholder="0000.00"
          value={productPrice}
          onChange={handleChange}
        />
      </div>
      <div className="view w-18 p-4-8 pb-10 right">
        <span className="span dark">{""}</span>
      </div>
      <button className="circle-button" onClick={""}>
        -
      </button>
    </div>
  );
};

export default ProductCard;

/*
  TODO:

    const updateProducts = invoice.products.map((product, i) => {
        if (i === index) {
          return {
            ...product,
            productsPrice: value,
          };
        }
        return product;
      });
      setNewInvoice({ ...invoice, products: updateProducts });
      console.log(updateProducts[index]);

    Wstawić w osobną funkcję i użyć callback w if
*/