import { useState } from "react";   
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewAllProduct from "./pages/ViewAllProduct";
import SingleProductView from "./pages/SingleProductView";
import Login from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import Otp from "./pages/Otp";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import AdminAddCarousel from "./pages/AdminAddCarousel";


function App() {

  const [products, setProducts] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/admin/addCarousel" element={<AdminAddCarousel />} />
        <Route path="/view-all" element={<ViewAllProduct/>} />
        <Route path="/single-product-view/:id" element={<SingleProductView/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/userRegistration" element={<UserRegistration/>} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/admin/*"
          element={
            <AdminPanel
              products={products}
              setProducts={setProducts}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;