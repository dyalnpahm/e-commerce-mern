import React from "react";
import ProductList from "../components/productlist";
import Category from "../components/Categories";
import Cart from "../components/cart";

const Home = () => {
  return (
    <div className="container">
      <Category />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
