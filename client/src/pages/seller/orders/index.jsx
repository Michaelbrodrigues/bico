import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useStateProvider } from "../../../context/StateContext";
import { GET_SELLER_ORDERS_ROUTE, CANCEL_ORDER_ROUTE, ORDERS_ROUTES } from "../../../utils/constants";

function Orders() {
  const [ orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancellationError, setCancellationError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data: { orders } } = await axios.get(GET_SELLER_ORDERS_ROUTE, { withCredentials: true });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  const cancelOrder = async (orderId) => {
    try {
      setIsCancelling(true);
      console.log('CANCEL_ORDER_ROUTE:', CANCEL_ORDER_ROUTE, ORDERS_ROUTES);
      console.log('orderId:', orderId);
      //console.log('id:', id);

      await axios.delete(`${ORDERS_ROUTES}/${orderId}`, { withCredentials: true });
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error(err);
      setCancellationError("Error cancelling the order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order Id</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Delivery Time</th>
              <th scope="col" className="px-6 py-3">Ordered By</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Send Message</th>
              <th scope="col" className="px-6 py-3">Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50" key={order.id}>
                <th scope="row" className="px-6 py-4">{order.id}</th>
                <th scope="row" className="px-6 py-4 font-medium">{order.gig.title}</th>
                <td className="px-6 py-4">{order.gig.category}</td>
                <td className="px-6 py-4">{order.price}</td>
                <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                <td className="px-6 py-4">{order.buyer.fullName} ({order.buyer.username})</td>
                <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>
                <td className="px-6 py-4">
                  <Link href={`/seller/orders/messages/${order.id}`} className="font-medium text-blue-600  hover:underline">Message Buyer</Link>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => cancelOrder(order.id)} disabled={isCancelling}>
                    {isCancelling ? "Cancelling..." : "Cancel Order"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Display an error message if cancellation fails */}
      {cancellationError && <p style={{ color: "red" }}>{cancellationError}</p>}
    </div>
  );
}

export default Orders;

