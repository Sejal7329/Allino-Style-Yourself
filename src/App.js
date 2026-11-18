
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ShopProvider } from "./Context/ShopContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";

import "./App.css";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
