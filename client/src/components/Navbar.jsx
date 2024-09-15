import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

function Navbar() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const links = [
    { linkName: "Gigger Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Log in", handler: handleLogin, type: "button" },
    { linkName: "Sign up", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  useEffect(() => {
    if (cookies.jwt && userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          let projectedUserInfo = { ...user };
          if (user.image) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.image,
            };
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          if (user.isProfileSet === false) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, dispatch]);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();
      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);

  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-4 md:px-8 lg:px-24 flex flex-col md:flex-row justify-between items-center py-4 md:py-6 top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <FiverrLogo
                fillColor={!navFixed && !userInfo ? "#ffffff" : "#404145"}
                className="w-20 h-auto"
              />
            </Link>

            {/* Mobile Menu Toggle Button */}
            {router.pathname !== "/" && (
              <button
                className="md:hidden flex items-center text-2xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </button>
            )}
          </div>

          {/* Show the full navbar only on home page, otherwise show only toggle */}
          {router.pathname === "/" && (
            <div
              className={`flex ${
                navFixed || userInfo ? "opacity-100" : "opacity-0"
              } items-center space-x-4 md:space-x-6`}
            >
              <input
                type="text"
                placeholder="What service are you looking for today?"
                className="w-full md:w-[30rem] py-2 px-4 border rounded-md"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button
                className="bg-gray-900 py-1.5 text-white w-12 md:w-16 flex justify-center items-center rounded-md"
                onClick={() => {
                  setSearchData("");
                  router.push(`/search?q=${searchData}`);
                }}
              >
                <IoSearchOutline className="fill-white text-white h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          )}

          {!userInfo && router.pathname === "/" ? (
            <ul className="flex flex-col md:flex-row gap-4 md:gap-10 items-center mt-4 md:mt-0">
              {links.map(({ linkName, handler, type }) => (
                <li
                  key={linkName}
                  className={`${
                    navFixed ? "text-black" : "text-white"
                  } font-medium`}
                >
                  {type === "link" && <Link href={handler}>{linkName}</Link>}
                  {type === "button" && (
                    <button onClick={handler}>{linkName}</button>
                  )}
                  {type === "button2" && (
                    <button
                      onClick={handler}
                      className={`border text-md font-semibold py-1 px-3 rounded-sm ${
                        navFixed
                          ? "border-[#1DBF73] text-[#1DBF73]"
                          : "border-white text-white"
                      } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                    >
                      {linkName}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : userInfo ? (
            <ul className="flex flex-col md:flex-row gap-4 md:gap-10 items-center mt-4 md:mt-0">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#1DBF73] font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              <li
                className="cursor-pointer text-[#1DBF73] font-medium"
                onClick={handleOrdersNavigate}
              >
                Orders
              </li>
              {isSeller ? (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Buyer
                </li>
              ) : (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Seller
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenuVisible((prev) => !prev);
                }}
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo?.imageName}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex justify-center items-center h-10 w-10 rounded-full bg-[#1DBF73] text-white">
                    <span className="text-2xl">
                      {userInfo?.email &&
                        userInfo?.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          ) : null}
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
