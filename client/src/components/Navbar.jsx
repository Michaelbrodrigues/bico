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
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          className={`w-full px-4 sm:px-8 lg:px-16 xl:px-24 flex justify-between items-center py-6 top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <FiverrLogo
                className="w-20 sm:w-28 lg:w-36"
                fillColor={!navFixed && !userInfo ? "#ffffff" : "#404145"}
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div
            className={`hidden sm:flex ${
              navFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="What service are you looking for today?"
              className="w-full sm:w-[15rem] lg:w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>

          {/* Links for larger screens */}
          <ul className="hidden sm:flex gap-4 sm:gap-10 items-center">
            {!userInfo
              ? links.map(({ linkName, handler, type }) => (
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
                ))
              : null}
          </ul>

{/* Mobile Menu */}
{isMobileMenuOpen && (
  <ul className="flex flex-col sm:hidden gap-4 items-center absolute bg-white w-full top-16 left-0 z-50 p-4">
    {!userInfo
      ? links.map(({ linkName, handler, type }) => (
          <li key={linkName} className="text-black font-medium">
            {type === "link" && <Link href={handler}>{linkName}</Link>}
            {type === "button" && (
              <button onClick={handler}>{linkName}</button>
            )}
            {type === "button2" && (
              <button
                onClick={handler}
                className="border border-[#1DBF73] text-[#1DBF73] hover:bg-[#1DBF73] hover:text-white py-2 px-4 rounded"
              >
                {linkName}
              </button>
            )}
          </li>
        ))
      : null}
  </ul>
)}

{links && links.length > 0 ? (
  links.map(({ linkName, handler, type }) => (
    <li key={linkName} className="text-black font-medium">
      {type === "link" && <Link href={handler}>{linkName}</Link>}
      {type === "button" && (
        <button onClick={handler}>{linkName}</button>
      )}
      {type === "button2" && (
        <button
          onClick={handler}
          className="border border-[#1DBF73] text-[#1DBF73] hover:bg-[#1DBF73] hover:text-white py-2 px-4 rounded"
        >
          {linkName}
        </button>
      )}
    </li>
  ))
) : null}


          {/* User info or contextual menu for larger screens */}
          {userInfo && (
            <ul className="hidden sm:flex gap-4 sm:gap-10 items-center">
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
                <li className="cursor-pointer font-medium" onClick={handleModeSwitch}>
                  Switch To Buyer
                </li>
              ) : (
                <li className="cursor-pointer font-medium" onClick={handleModeSwitch}>
                  Switch To Seller
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full sm:w-10 sm:h-10"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {userInfo?.email?.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
