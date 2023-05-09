import React from "react";
import ProductList from "../components/productlist";
import CategoryMenu from "../components/Categories";
import Cart from "../components/cart";
import Lists from "../components/list/lists";
const Home = () => {
  return (
    <div className="container">
      <Lists/>
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
