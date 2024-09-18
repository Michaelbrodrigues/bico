import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_PRE_TRANSACTION_MESSAGES } from "../../utils/constants";
import { useStateProvider } from "../../context/StateContext";
import Link from "next/link";
import { useCookies } from "react-cookie";

function PreSaleUnreadMessages() {
  const [{ userInfo }] = useStateProvider();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userInfo) return;

      try {
        const response = await axios.get(`${GET_PRE_TRANSACTION_MESSAGES}/${userInfo.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        if (response.status === 200) {
          if (response.data.messages.length > 0) {
            setMessage(response.data.messages[0]);
          } else {
            setMessage(null);
          }
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-4 sm:px-8 lg:px-32">
      <h3 className="m-5 text-xl sm:text-2xl font-semibold">Unread Pre-Sale Message</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {message ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Buyer ID</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Message</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Sender</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Received At</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">View Message</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50" key={message.id}>
                <td className="px-4 py-2 sm:px-6 sm:py-4">{message.senderId}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-4">{message.text}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-4">{message.sender.fullName || message.sender.username}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-4">{new Date(message.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-4">
                  <Link href={`/seller/orders/messages2/${message.senderId}`} className="font-medium text-blue-600 hover:underline">
                    View Message
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-4 text-center">No unread messages</div>
        )}
      </div>
    </div>
  );
}

export default PreSaleUnreadMessages;

