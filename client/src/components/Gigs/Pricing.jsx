import React from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useStateProvider } from "../../context/StateContext";
import { useRouter } from "next/router";
import Link from "next/link";

function Pricing() {
  const [{ gigData, userInfo }] = useStateProvider();
  const router = useRouter();

  return (
    <>
      {gigData && (
        <div className="sticky top-36 mb-10 h-max w-full sm:w-96 p-4 sm:p-0">
          <div className="border p-4 sm:p-8 lg:p-10 flex flex-col gap-5">
            {/* Short description and price */}
            <div className="flex justify-between items-center">
              <h4 className="text-sm sm:text-md font-normal text-[#74767e]">
                {gigData.shortDesc}
              </h4>
              <h6 className="font-medium text-lg">${gigData.price}</h6>
            </div>

            {/* Delivery time and revisions */}
            <div className="text-[#62646a] font-semibold text-sm flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <FiClock className="text-xl" />
                <span>{gigData.deliveryTime} Days Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <FiRefreshCcw className="text-xl" />
                <span>{gigData.revisions} Revisions</span>
              </div>
            </div>

            {/* Features List */}
            <ul className="flex gap-2 flex-col">
              {gigData.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <BsCheckLg className="text-[#1DBF73] text-lg" />
                  <span className="text-[#4f5156] text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            {gigData.userId === userInfo.id ? (
              <button
                className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-sm sm:text-lg relative rounded"
                onClick={() => router.push(`/seller/gigs/${gigData.id}`)}
              >
                <span>Edit</span>
                <BiRightArrowAlt className="text-2xl absolute right-4" />
              </button>
            ) : (
              <button
                className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-sm sm:text-lg relative rounded"
                onClick={() => router.push(`/checkout?gigId=${gigData.id}`)}
              >
                <span>Continue</span>
                <BiRightArrowAlt className="text-2xl absolute right-4" />
              </button>
            )}

            {/* Message Seller Link */}
            {gigData.userId !== userInfo.id && (
              <div className="flex items-center justify-center mt-5">
                <Link
                  href={`/seller/orders/messages2/${gigData.userId}`}
                  className="font-medium text-blue-600 hover:underline text-sm sm:text-base"
                >
                  Message Seller
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Pricing;
