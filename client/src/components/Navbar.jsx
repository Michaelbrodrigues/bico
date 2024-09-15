import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import ContextMenu from "./ContextMenu";

function Navbar() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ isSeller, userInfo }, dispatch] = useStateProvider();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sticky navbar effect
  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        setNavFixed(window.pageYOffset > 0);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  // Handle Login/Signup
  const handleLogin = () => {
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  // Fetch User Info and Redirect to Dashboard
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data: { user } } = await axios.post(
          GET_USER_INFO,
          {},
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${cookies.jwt}` },
          }
        );
        dispatch({
          type: reducerCases.SET_USER,
          userInfo: { ...user, imageName: user.image ? HOST + "/" + user.image : null },
        });
        setIsLoaded(true);

        // Redirect to the appropriate dashboard
        if (user.isSeller) {
          router.push("/seller/dashboard");
        } else {
          router.push("/buyer/dashboard");
        }
      } catch (err) {
        console.log("Error fetching user info:", err);
        router.push("/login");
      }
    };

    if (cookies.jwt && !userInfo) {
      fetchUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies.jwt, dispatch, router, userInfo]);

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-4 sm:px-8 lg:px-16 flex justify-between items-center py-4 z-30 transition-all duration-300 ${navFixed || userInfo ? "fixed bg-white border-b border-gray-200" : "absolute bg-transparent"
            }`}
        >
          {/* Logo */}
          <div>
            <Link href="/">
              <FiverrLogo className="w-20 sm:w-28" fillColor={navFixed ? "#404145" : "#ffffff"} />
            </Link>
          </div>

          {/* Search bar (only on larger screens) */}
          <div className="hidden sm:flex items-center">
            <input
              type="text"
              placeholder="What service are you looking for?"
              className="w-[15rem] lg:w-[30rem] py-2.5 px-4 border rounded-l"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="bg-gray-900 py-2 text-white w-12 rounded-r"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>

          {/* Menu links */}
          <ul className="hidden sm:flex items-center gap-8">
            <li className="font-medium text-black">
              <Link href="/explore">Explore</Link>
            </li>
            {userInfo ? (
              <li className="font-medium text-black">
                <button onClick={() => router.push(isSeller ? "/seller/dashboard" : "/buyer/dashboard")}>
                  Dashboard
                </button>
              </li>
            ) : (
              <>
                <li className="font-medium text-black">
                  <button onClick={handleLogin}>Log in</button>
                </li>
                <li className="font-medium text-black">
                  <button onClick={handleSignup} className="border border-[#1DBF73] text-[#1DBF73] px-4 py-2 rounded hover:bg-[#1DBF73] hover:text-white transition-all">
                    Sign up
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* User profile or mobile menu button */}
          <div className="flex items-center gap-4">
            {userInfo ? (
              <div className="relative">
                <Image src={userInfo.imageName} alt="Profile" width={40} height={40} className="rounded-full" />
                <ContextMenu data={[]} /> {/* Replace with actual context menu data */}
              </div>
            ) : (
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden text-2xl">
                ☰
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <ul className="flex flex-col sm:hidden gap-4 items-center absolute bg-white w-full top-16 left-0 z-50 p-4">
              <li className="text-black font-medium">
                <Link href="/explore">Explore</Link>
              </li>
              {userInfo ? (
                <li className="text-black font-medium">
                  <button onClick={() => router.push(isSeller ? "/seller/dashboard" : "/buyer/dashboard")}>
                    Dashboard
                  </button>
                </li>
              ) : (
                <>
                  <li className="text-black font-medium">
                    <button onClick={handleLogin}>Log in</button>
                  </li>
                  <li className="text-black font-medium">
                    <button onClick={handleSignup} className="border border-[#1DBF73] text-[#1DBF73] px-4 py-2 rounded hover:bg-[#1DBF73] hover:text-white transition-all">
                      Sign up
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      )}
    </>
  );
}

export default Navbar;
