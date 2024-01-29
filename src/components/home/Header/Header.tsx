import { MouseEvent, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import headerLogo from "../../../assets/images/logo.png";
import Flex from "../../designLayouts/Flex";
import { Container, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { NavBarItem } from "../../../types/navbar";
import { navBarList } from "../../../constants/navbar";
import { verifyMemberData } from "../../../app/ApiServices/verify";
import MemberApiService from "../../../app/ApiServices/memberApiService";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
import { Close, LogoutOutlined } from "@mui/icons-material";
import useWindowSize from "../../../constants/useWindowResize";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const [width] = useWindowSize();
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  const handleLogOutClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleCloseLogOut = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogoutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      const res = await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("Log out successfully", 700, true);
      navigate("/");

      return res;
    } catch (err) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <Container>
        <nav className="h-full px-4 max-w-container mx-auto relative">
          <Flex className="flex items-center justify-between h-full">
            <Link to="/">
              <h1 className="sm:text-3xl text-xl font-bold text-orange-500 sm:text-left text-center mb-3 flex items-center gap-3">
                <img src={headerLogo} alt="" className="max-w-[50px]" />
                Shopsy
              </h1>
            </Link>
            <div>
              {showMenu && width > 667 && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center w-full  p-0 gap-3"
                >
                  <>
                    {navBarList?.map(({ _id, title, link }: NavBarItem) => {
                      if (!verifyMemberData && title === "My page") {
                        return null;
                      }

                      if (
                        (verifyMemberData && title === "Sign In") ||
                        (verifyMemberData && title === "Sign Up")
                      ) {
                        return null;
                      }

                      return (
                        <NavLink
                          key={_id}
                          className={
                            verifyMemberData
                              ? "verify_member"
                              : "non_verify_member"
                          }
                          to={link}
                          state={{ data: location.pathname.split("/")[1] }}
                        >
                          <li className="text-center w-28 lg:text-[18px] pl-2 ">
                            {title}
                          </li>
                        </NavLink>
                      );
                    })}
                  </>
                  {verifyMemberData && (
                    <img
                      src={verifyMemberData.mb_image}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      alt=""
                      onClick={handleLogOutClick}
                    />
                  )}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseLogOut}
                    onClick={handleCloseLogOut}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                  >
                    <MenuItem
                      sx={{ cursor: "pointer" }}
                      onClick={handleLogoutRequest}
                    >
                      <ListItemIcon>
                        <LogoutOutlined fontSize="small" color="primary" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </motion.ul>
              )}
              <HiMenuAlt2
                onClick={() => setSidenav(!sidenav)}
                className="inline-block md:hidden cursor-pointer transition-all w-8 h-6 absolute top-6 right-4"
              />
              {sidenav && (
                <div className="fixed transition-all top-0 left-0 w-[667px] h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[80%] h-full relative"
                  >
                    <div className="w-full h-full bg-primeColor p-6">
                      <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                        <img src={headerLogo} alt="" className="max-w-[50px]" />
                        Shopsy
                      </h1>
                      <ul className="text-gray-200 flex flex-col gap-2">
                        {navBarList?.map((item: any) => (
                          <li
                            className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                            key={item._id}
                          >
                            <NavLink
                              to={item.link}
                              state={{ data: location.pathname.split("/")[1] }}
                              onClick={() => setSidenav(false)}
                            >
                              {item.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                      <Close
                        className="absolute left-[55%] text-2xl"
                        onClick={() => setSidenav(false)}
                      />
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </Flex>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
