import { useEffect, useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ invoice, setNewInvoice, products }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductQty, setSelectedProductQty] = useState("");

  const handleProductChange = (event, index) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct(selectedProduct);
    setSelectedProductQty(1); // Domyślnie ustawiamy ilość produktu na 1
    const productIndex = invoice.products.findIndex(
      (product) => product._id === selectedProductId
    );
    if (productIndex >= 0) {
      const newProductsList = [...invoice.products];
      newProductsList[productIndex] = {
        ...newProductsList[productIndex],
        qty: selectedProductQty,
      };
      setNewInvoice({ ...invoice, products: newProductsList });
    } else {
      setNewInvoice({
        ...invoice,
        products: [
          ...invoice.products,
          { ...selectedProduct, qty: selectedProductQty },
        ],
      });
    }
  };
  useEffect(() => {
    setSelectedProduct("");
    setSelectedProductQty("");
  }, [invoice]);
  console.log(invoice);
  return (
    <div className="view row flex b-b flex-align">
      <div className="view w-48 p-4-8 flex-align">
        {products.length ? (
          <div>
            <select className="custom-select"
              value={selectedProduct._id}
              onChange={handleProductChange}
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
            value={selectedProduct.qty}
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
