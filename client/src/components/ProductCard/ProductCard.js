import { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ invoice, setNewInvoice, products, index }) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    console.log("Produkt: ", selectedProduct);
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
    console.log("handleProductChange", index, updateProduct);
  };

  console.log("ProductCard", index, invoice);
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
            placeholder="0"
            value={selectedProduct.productsQty}
          />
        </p>
      </div>
      <div className="view w-17 p-4-8 pb-10 ">
        <input
          className="input dark right"
          placeholder="0000.00"
          value={selectedProduct.productsPrice}
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
    Usuwanie produktów z bazy i zapisywanie od bazy. Aktualnie zapisuje mi nowy produkt
    z tego samego inputu, powinno jedynie zmieniać.
*/
