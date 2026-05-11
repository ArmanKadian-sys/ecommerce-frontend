import AddProduct from "./components/AddProduct"
import NavBar from "./components/NavBar";
import SimpleBar from "./components/SimpleBar";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DisplaySellerProducts from "./components/DisplaySellerProducts";
import DisplayCustomerProducts from "./components/DisplayCustomerProducts";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CheckoutPage from "./components/CheckoutPage";
import Orders from "./components/Orders";
import Reviews from "./components/Reviews";
import { useSelector } from "react-redux";
import Description from "./components/Description";
import Footer from "./components/Foorter";

function App() {
  const { userType } = useSelector((state) => { return state.auth })
  const location = useLocation();
  return (
    <>
      {location.pathname == "/auth/login" || location.pathname == "/auth/register" ? <SimpleBar /> : <NavBar />}
      <Routes>
        <Route path='/add' element={<AddProduct />} />
        <Route path='/' element={
          userType == "seller" ?
            <DisplaySellerProducts />
            :
            <DisplayCustomerProducts />}
        />
        <Route path='/cart' element={<CheckoutPage />} />
        <Route path="/review/:id" element={<Reviews />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>

    </>
  )
}

export default App;
