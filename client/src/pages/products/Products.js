import { Types } from "mongoose";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ProductList } from "./ProductList";
import { productFormFields } from "./inputProduct";
import markup from "../../markup/inputs";

const Products = () => {
  let { id } = useParams();
  const [newProduct, setNewProduct] = useState({
    _id: Types.ObjectId(), // wygeneruj nowe ID
    productsName: "",
    qty: 1,
    price: 0,
  });
  const [allProducts, setAllProducts] = useState([]);

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

  const handleClick = () => {
    axios
      .post(`/${id}/addProduct`, newProduct)
      .then((res) => {
        console.log(res.data);
        setAllProducts([...allProducts, newProduct]); // aktualizujemy stan listy produktów
        setNewProduct({
          _id: Types.ObjectId(), // wygeneruj nowe ID
          productsName: "",
          qty: 1,
          price: 0,
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
        <h1>Invoice</h1>
        <p>There are total 7 invoices</p>
      </div>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>

      <div className="details__box">
        {productFormFields.map((item) => markup(item, handleChange))}
      </div>

      <button className="button mark__as-btn" onClick={handleClick}>
        Click
      </button>
      <ProductList id={id} products={allProducts} onDelete={deleteProduct} />
    </div>
  );
};

export default Products;
