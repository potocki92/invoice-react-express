import { useEffect, useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ invoice, setNewInvoice, products, index }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQty, setProductQty] = useState(1);
  const [productPrice, setProductPrice] = useState(1);
  const [amount, setAmount] = useState(1);

  const updatedProduct = (key, value) => {
    const updatedProducts = invoice.products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          [key]: value,
        };
      }
      return product;
    });

    setNewInvoice({ ...invoice, products: updatedProducts });
  };
  
  // Update amount for every change of qty and price
  useEffect(() => {
    const updateAmount = productQty * productPrice;
    setAmount(updateAmount);
    updatedProduct("amount", updateAmount);
    console.log(invoice.products[0]);
  }, [productQty * productPrice]);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct({
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      amount: 0,
    });
    // kopia wszystich produktów z invoice
    const updateProduct = [...invoice.products];

    // update określonego produktu
    updateProduct[index] = {
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      amount: 0,
    };
    // zapisanie zmiany produktu do invoice
    setNewInvoice({ ...invoice, products: updateProduct });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "productsQty") {
      setProductQty(value);
      updatedProduct("productsQty", value);
    }
    if (name === "productsPrice") {
      setProductPrice(value);
      updatedProduct("productsPrice", value);
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
        <span className="span dark">{amount}</span>
      </div>
      <button className="circle-button" onClick={""}>
        -
      </button>
    </div>
  );
};

export default ProductCard;
