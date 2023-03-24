import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ProductList } from "./ProductList";

const Products = () => {
  let { id } = useParams();
  const [newProduct, setNewProduct] = useState({
    _id: Types.ObjectId(), // wygeneruj nowe ID
    productsName: "",
    qty: 1,
    productsPrice: 0.0,
    amount: 0,
  });
  const [allProducts, setAllProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(allProducts));
  }, [allProducts]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/${id}/products`);
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`/${id}/addProduct`, newProduct)
      .then((res) => {
        console.log(res.data);
        setAllProducts([...allProducts, newProduct]); // aktualizujemy stan listy produktów
        setNewProduct({
          _id: Types.ObjectId(), // wygeneruj nowe ID
          productsName: "",
          qty: 1,
          price: 0.0,
        }); // resetujemy dane dotyczące produktu
      })
      .catch((err) => console.error(err));
  };
  const deleteProduct = (productId) => {
    axios
      .delete(`/${id}/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setAllProducts(
          allProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="main__container">
      <div className="invoice__home-logo">
        <h1>Products</h1>
        {allProducts && <p>There are total {allProducts.length} products</p>}
      </div>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>

      <form className="details__box" onSubmit={(e) => handleClick(e)}>
        <div className="form__group">
          <p>Product Name</p>
          <input
            type={"text"}
            name={"productsName"}
            value={newProduct.productsName}
            onChange={handleChange}
            placeholder={"Product name"}
            required
          ></input>
        </div>
        <div className="form__group">
          <p>Price</p>
          <input
            type={"number"}
            name={"productsPrice"}
            value={newProduct.productsPrice}
            onChange={handleChange}
            placeholder={"Product name"}
            required
          ></input>
        </div>
        <button className="button mark__as-btn" type="submit">
          Click
        </button>
      </form>

      <ProductList id={id} products={allProducts} onDelete={deleteProduct} />
    </div>
  );
};

export default Products;
