import { Types } from "mongoose";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ProductList } from "./ProductList";
import { ModalCard } from "../../components/ModalCard/ModalCard";
import taxRate from "./taxRateArray";

const Products = () => {
  let { id } = useParams();
  const [newProduct, setNewProduct] = useState({
    _id: Types.ObjectId(), // wygeneruj nowe ID
    productsName: "",
    qty: 1,
    productsPrice: 0.0,
    amount: 0,
    productsTax: {},
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

  const handleVatChange = (event, index) => {
    const indexTarget = event.target.value;
    const selectedVatRate = taxRate[indexTarget];
    setNewProduct({ ...newProduct, productsTax: selectedVatRate });
  };
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`/${id}/addProduct`, newProduct)
      .then((res) => {
        console.log(res.data, newProduct);
        setAllProducts([...allProducts, newProduct]); // aktualizujemy stan listy produktów
        setNewProduct({
          _id: Types.ObjectId(), // wygeneruj nowe ID
          productsName: "",
          qty: 1,
          price: 0.0,
          productsTax: 0.0,
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
    <div className="container">
      <div className="invoice__home-logo">
        <h1>Products</h1>
        {allProducts && <p>There are total {allProducts.length} products</p>}
      </div>
      <Link to={`/${id}`}>
        <button className="button back_button">Go Back</button>
      </Link>
      
      <ModalCard
        newProduct={newProduct}
        taxRate={taxRate}
        handleVatChange={handleVatChange}
        handleClick={handleClick}
        handleChange={handleChange}
      />
      <ProductList id={id} products={allProducts} onDelete={deleteProduct} />
    </div>
  );
};

export default Products;
