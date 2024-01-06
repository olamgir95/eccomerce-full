import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import SpecialCase from "../components/SpecialCase/SpecialCase";
import About from "../pages/About/About";
import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Journal from "../pages/Journal/Journal";
import Offer from "../pages/Offer/Offer";
import Payment from "../pages/payment/Payment";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Shop from "../pages/Shop/Shop";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <Header />
      {pathname === "/cart" ? null : <HeaderBottom />}
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/paymentgateway" element={<Payment />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);

function Routers() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default Routers;
