import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
// import SpecialCase from "../components/SpecialCase/SpecialCase";
import { Outlet, useLocation } from "react-router-dom";
import Contact from "../pages/Contact/Contact";
import { CommunityPage } from "../pages/CommunityPage";
import Offer from "../pages/Offer/Offer";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import { Payment } from "@mui/icons-material";
import Cart from "../pages/Cart/Cart";
import Footer from "../components/home/Footer/Footer";
import { HelpPage } from "../pages/Help/Help";
import { MemberPage } from "../pages/MemberPgae";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/community", element: <CommunityPage /> },
  { path: "/shop", element: <Shop /> },
  { path: "/offer", element: <Offer /> },
  { path: "/help", element: <HelpPage /> },
  { path: "/product/:_id", element: <ProductDetails /> },
  { path: "/paymentgateway", element: <Payment /> },
  { path: "/cart", element: <Cart /> },
  { path: "/member-page", element: <MemberPage /> },
];

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className="custom-scroll-container">
      <Header />
      {pathname === "/cart" || "/community" || "/member-page" ? null : (
        <HeaderBottom />
      )}
      {/* <SpecialCase /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
