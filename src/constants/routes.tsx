import Home from "../pages/Home/Home";
import ShopPage from "../pages/ShopPage/ShopPage";
import Header from "../components/home/Header/Header";
import { Outlet } from "react-router-dom";
import { CommunityPage } from "../pages/CommunityPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import { Payment } from "@mui/icons-material";
import Cart from "../pages/Cart/Cart";
import Footer from "../components/home/Footer/Footer";
import { HelpPage } from "../pages/Help/Help";
import { MemberPage } from "../pages/MemberPgae";
import SpecialCase from "../components/SpecialCase/SpecialCase";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/community", element: <CommunityPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/help", element: <HelpPage /> },
  { path: "/product/:_id", element: <ProductDetails /> },
  { path: "/paymentgateway", element: <Payment /> },
  { path: "/cart", element: <Cart /> },
  { path: "/member-page", element: <MemberPage /> },
];

const Layout = () => {
  return (
    <div className="custom-scroll-container">
      <Header />
      <SpecialCase />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
