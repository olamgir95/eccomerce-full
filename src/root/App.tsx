import { Route, useLocation, Routes, useSearchParams } from "react-router-dom";
import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import AOS, { AosOptions } from "aos";
import Layout, { routes } from "../constants/routes";
import { useEffect } from "react";
import ScrollToTop from "./../constants/scrollToTop";
import { CombinedProvider } from "../context/useCombinedContext";
import OtherPage from "../pages/MemberPage/OtherPage";
import "@toast-ui/editor/dist/toastui-editor.css";

interface CustomAosOptions extends AosOptions {
  offset: number;
  duration: number;
  delay: number;
  container?: string;
}

function App() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const chosen_mb_id = searchParams.get("mb_id") || null;
  const chosen_art_id = searchParams.get("art_id") || null;

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
    <>
      <ScrollToTop />
      <CombinedProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes?.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route
              path="/member-page/other"
              element={
                <OtherPage
                  chosen_mb_id={chosen_mb_id}
                  chosen_art_id={chosen_art_id}
                />
              }
            />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </CombinedProvider>
    </>
  );
}

export default App;
