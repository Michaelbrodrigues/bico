import { useStateProvider } from "../../../context/StateContext";
import { GET_BUYER_ORDERS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies();
  const [{ userInfo }] = useStateProvider();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_BUYER_ORDERS_ROUTE, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-4 md:px-10 lg:px-32">
      <h3 className="m-5 text-xl md:text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 md:px-6 py-3">Order Id</th>
              <th scope="col" className="px-2 md:px-6 py-3">Name</th>
              <th scope="col" className="px-2 md:px-6 py-3">Category</th>
              <th scope="col" className="px-2 md:px-6 py-3">Price</th>
              <th scope="col" className="px-2 md:px-6 py-3">Delivery Time</th>
              <th scope="col" className="px-2 md:px-6 py-3">Order Date</th>
              <th scope="col" className="px-2 md:px-6 py-3">Send Message</th>
              <th scope="col" className="px-2 md:px-6 py-3">Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                  key={order.id}
                >
                  <th scope="row" className="px-2 md:px-6 py-4 ">{order.id}</th>
                  <td className="px-2 md:px-6 py-4 font-medium">{order.gig.title}</td>
                  <td className="px-2 md:px-6 py-4">{order.gig.category}</td>
                  <td className="px-2 md:px-6 py-4">{order.price}</td>
                  <td className="px-2 md:px-6 py-4">{order.gig.deliveryTime}</td>
                  <td className="px-2 md:px-6 py-4">{order.createdAt.split("T")[0]}</td>
                  <td className="px-2 md:px-6 py-4 ">
                    <Link
                      href={`/buyer/orders/messages/${order.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Message Seller
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
