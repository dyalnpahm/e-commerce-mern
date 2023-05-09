import React from "react";
import ProductList from "../components/productlist";
import CategoryMenu from "../components/Categories";
import Cart from "../components/cart";

const Home = () => {
  return (
    <div className="container">
     
      <CategoryMenu />
      <ProductList />
      <Cart/>
    </div>
  );
};

export default Home;
