import { Route, useLocation, Routes, useNavigate } from "react-router-dom";
import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import AOS, { AosOptions } from "aos";
import Layout, { routes } from "../constants/routes";
import { useEffect } from "react";
import "aos/dist/aos.css";
import ScrollToTop from "./../constants/scrollToTop";

interface CustomAosOptions extends AosOptions {
  offset: number;
  duration: number;
  delay: number;
  container?: string;
}

function App() {
  const pathname = window.location.pathname;

  useEffect(() => {
    const aosOptions: CustomAosOptions = {
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      container: ".custom-scroll-container",
    };

    AOS.init(aosOptions);
    AOS.refresh();
  }, [pathname]);

  return (
    <div className="font-bodyFont custom-scroll-container">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
