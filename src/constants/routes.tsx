import Home from "../pages/Home/Home";
import ShopPage from "../pages/ShopPage/ShopPage";
import Header from "../components/home/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { CommunityPage } from "../pages/CommunityPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Footer from "../components/home/Footer/Footer";
import { HelpPage } from "../pages/Help/Help";
import SpecialCase from "../components/SpecialCase/SpecialCase";
import MyPage from "../pages/MemberPage/MyPage";
import { OrdersPage } from "../pages/OrdersPage";
import CommunityChats from "../components/CommunityChat/communityChats";
import useWindowSize from "../constants/useWindowResize";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/community", element: <CommunityPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/help", element: <HelpPage /> },
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/member-page", element: <MyPage /> },
];

const Layout = () => {
  const { pathname } = useLocation();
  const [width] = useWindowSize();
  return (
    <div className="custom-scroll-container font-bodyFont">
      <Header />
      <SpecialCase />
      <CommunityChats />
      {width < 667 && pathname !== "/" ? (
        <h1 className="my-40 text-center text-black font-bold">
          Mobile version is developing <br /> Please use our desktop version.
        </h1>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
};

export default Layout;
