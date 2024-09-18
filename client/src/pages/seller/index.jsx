import { useStateProvider } from "../../context/StateContext";
import { GET_SELLER_DASHBOARD_DATA, HOST } from "../../utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Index() {
  const [{ userInfo }] = useStateProvider();
  const [cookies] = useCookies();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(undefined);

  useEffect(() => {
    const getBuyerDashboardData = async () => {
      const response = await axios.get(GET_SELLER_DASHBOARD_DATA, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      if (response.status === 200) {
        setDashboardData(response.data.dashboardData);
      }
      console.log({ response });
    };
    if (userInfo) {
      getBuyerDashboardData();
    }
  }, [userInfo]);

  return (
    <>
      {userInfo && (
        <div className="flex flex-col lg:flex-row min-h-[80vh] my-10 mt-0 px-4 md:px-10 lg:px-32 gap-5">
          {/* User Info Section */}
          <div className="shadow-md h-max p-5 md:p-10 flex flex-col gap-5 min-w-full lg:min-w-96 lg:w-96">
            <div className="flex gap-5 justify-center items-center">
              <div>
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#62646a] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo.fullName}</span>
              </div>
            </div>
            <div className="border-t py-5">
              <p>{userInfo.description}</p>
            </div>
          </div>

          {/* Dashboard Section */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Total Gigs */}
              <div
                className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/gigs")}
              >
                <h2 className="text-lg md:text-xl">Total Gigs</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  {dashboardData?.gigs}
                </h3>
              </div>

              {/* Total Orders */}
              <div
                className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/orders")}
              >
                <h2 className="text-lg md:text-xl">Total Orders</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  {dashboardData?.orders}
                </h3>
              </div>

              {/* Unread Messages */}
              <div
                className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/unread-messages")}
              >
                <h2 className="text-lg md:text-xl">Unread Messages</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  {dashboardData?.unreadMessages}
                </h3>
              </div>

              {/* Pre-Sale Messages */}
              <div
                className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/pre-sale-unread-messages")}
              >
                <h2 className="text-lg md:text-xl">Pre-Sale Messages</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  {dashboardData?.preSaleUnreadMessages}
                </h3>
              </div>

              {/* Earnings Today */}
              <div className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg md:text-xl">Earnings Today</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  ${dashboardData?.dailyRevenue}
                </h3>
              </div>

              {/* Earnings Monthly */}
              <div className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg md:text-xl">Earnings Monthly</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  ${dashboardData?.monthlyRevenue}
                </h3>
              </div>

              {/* Earnings Yearly */}
              <div className="shadow-md p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg md:text-xl">Earnings Yearly</h2>
                <h3 className="text-[#1DBF73] text-2xl md:text-3xl font-extrabold">
                  ${dashboardData?.revenue}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;

