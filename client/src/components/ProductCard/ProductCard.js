import { useEffect, useState } from "react";
import "./ProductCard.css";

/**********************************************************************************************

  The code defines a component named "ProductCard" that takes in props such 
  as invoice, setNewInvoice, product, products, index, and handleRemoveCard.

  It also defines functions such as updatedProduct, handleProductChange, and handleChange. 
  The updatedProduct function is used to update the products array of the invoice object 
  whenever a user makes changes to a product's quantity or price. 
  The handleProductChange function is called when the user selects a product from a list. 
  The handleChange function updates the productQty or productPrice state
  when the corresponding input is changed and updates the corresponding 
  product in the invoice by calling the updatedProduct function.

  The code returns a component that renders a view containing a select element, 
  two input elements, and a remove button. 
  The select element allows the user to select a product from a list. 
  The input elements allow the user to update the quantity and price of the selected product. 
  The remove button allows the user to remove the selected product from the invoice.

**********************************************************************************************/
const ProductCard = ({ invoice, setNewInvoice, product, products, index }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQty, setProductQty] = useState(product.productsQty || 1);
  const [productPrice, setProductPrice] = useState(product.productsPrice || 1);
  const [amount, setAmount] = useState(1);

  /*
    This function takes in two arguments, key and value, and updates the invoice object with the new value. 
    The function first creates a new array of updatedProducts by iterating over the invoice.products.items array using the map method. 
    For the current product, identified by the index, the function creates a new object with the updated key and value. 
    For all other products, the function returns the original product object. 
    Finally, the function calls setNewInvoice with a new invoice object that merges the updated products array with the existing invoice object. 
    This function is used in the component to update the products array of the invoice object whenever a user makes changes to a product's quantity or price.
  */
  const updatedProduct = (key, value) => {
    const updatedProducts = invoice.products.items.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          [key]: value,
        };
      }
      return product;
    });
    setNewInvoice({
      ...invoice,
      products: { ...invoice.products, items: updatedProducts },
    });
  };
  /*
    handleRemoveProduct:
    This is a function used to remove a product items from the invoice. 
    It takes an index as an argument, removes the corresponding item from the "updateItems" array, and updates the state.
  */
  const handleRemoveProduct = () => {
    const updateItems = [...invoice.products.items];
    updateItems.splice(index, 1);

    setNewInvoice({
      ...invoice,
      products: {
        ...invoice.products,
        items: updateItems,
      },
    });
  };

  // Update amount for every change of productQty, productPrice, product.productsQty, product.productsPrice or amount
  useEffect(() => {
    setProductPrice(product.productsPrice);
    setProductQty(product.productsQty);
    const updateAmount = productQty * productPrice;
    setAmount(updateAmount);
    updatedProduct("amount", updateAmount);
  }, [
    productQty,
    productPrice,
    product.productsQty,
    product.productsPrice,
    amount,
  ]);

  /*
    This code defines a function handleProductChange that is called when the user selects a product from a list.
    First, the function extracts the ID of the selected product from the event object and finds the corresponding product object in the products array.
    Then, it updates the state of the selectedProduct object with the name, quantity, and price of the selected product, and sets the amount to 0.
    The function also updates the state of the productPrice and productQty variables with the selected product's price and quantity.
    Next, the function creates a copy of the invoice object's products.items array using the spread operator.
    Then, the function updates the product at the specified index in the copied array with the selected product's name, quantity, price, and a zero amount.
    Finally, the function sets the state of the newInvoice object with the updated items array and the previous invoice object's products object using the spread operator.
    */
  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct({
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      amount: selectedProduct.amount,
    });
    setProductPrice(selectedProduct.productsPrice);
    setProductQty(selectedProduct.qty);

    const updateProduct = [...invoice.products.items]; // copy all products from invoice.products

    // updates a specific product in an array of products
    updateProduct[index] = {
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      amount: selectedProduct.amount,
    };

    // updates the products object of the invoice object
    setNewInvoice({
      ...invoice,
      products: { ...invoice.products, items: updateProduct },
    });
  };

  /*
    This code defines a function called handleChange which takes an event object as an argument. 
    Inside the function, the name and value properties of the event target are destructured and assigned to constants.

    The function then checks if the name property is equal to "productsQty" or "productsPrice". 
    If the name is "productsQty", the value is set to the productQty state using the setProductQty function, 
    and then the updatedProduct function is called with the "productsQty" key and the new value as arguments.

    Similarly, if the name is "productsPrice", the value is set to the productPrice state using the setProductPrice function, 
    and then the updatedProduct function is called with the "productsPrice" key and the new value as arguments.

    Overall, this function updates the productQty or productPrice state when the corresponding input is changed, 
    and then updates the corresponding product in the invoice by calling the updatedProduct function.
  */
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
    <div className="view row flex b-b p-10 flex-align relative">
      <div className="view w-48 p-4-8 flex-align flex">
        {products.length ? (
          <div className="flex">
            <select
              className="custom-select"
              value={selectedProduct.productsName || ""}
              onChange={(event) => handleProductChange(event)}
            >
              <option value={""}>
                {product.productsName
                  ? product.productsName
                  : "Select the product"}
              </option>
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
        <input
          className="input dark right p-0"
          name="productsQty"
          placeholder="1"
          value={productQty}
          onChange={handleChange}
        />
      </div>
      <div className="view w-17 p-4-8 pb-10 ">
        <input
          className="input dark right p-0"
          name="productsPrice"
          placeholder="0000.00"
          value={productPrice}
          onChange={handleChange}
        />
      </div>
      <div className="view w-18 p-4-8 pb-10 right">
        <span className="span dark">{amount}</span>
      </div>
      <button className="circle-button delete" onClick={handleRemoveProduct}>
        -
      </button>
    </div>
  );
};

export default ProductCard;
