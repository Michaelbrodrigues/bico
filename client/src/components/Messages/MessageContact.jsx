import React, { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import axios from "axios";
import { ADD_PRE_TRANSACTION_MESSAGE, GET_PRE_TRANSACTION_MESSAGES } from "../../utils/constants";
import { useStateProvider } from "../../context/StateContext";

function MessageContact({ recipientId }) {
  const [{ userInfo }] = useStateProvider();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // Ensure recipientId and userInfo are available before fetching
        if (!recipientId || !userInfo) return;

        // Fetch messages from the server
        const response = await axios.get(`${GET_PRE_TRANSACTION_MESSAGES}/${recipientId}`, {
          withCredentials: false,
        });

        // Check if the response is successful
        if (response.status === 200) {
          // Update the messages state with the fetched data
          setMessages(response.data.messages);
        } else {
          setError("Failed to load messages");
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [recipientId, userInfo]);

  const sendMessage = async () => {
    if (messageText.trim().length === 0) return;

    try {
      const response = await axios.post(
        `${ADD_PRE_TRANSACTION_MESSAGE}/${recipientId}`,
        {
          message: messageText,
          recipientId: recipientId, // Ensure recipientId is passed correctly
        },
        {
          withCredentials: false,
        }
      );

      if (response.status === 201) {
        // Append the new message to the messages state
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        setMessageText(""); // Clear the input field after sending
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-[80vh]">
      <div className="max-h-[80vh] flex flex-col justify-center items-center">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col">
          <div className="mt-8">
            <div className="space-y-4 h-[50vh] overflow-y-auto pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === userInfo.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`inline-block rounded-lg ${message.senderId === userInfo.id ? "bg-[#1DBF73] text-white" : "bg-gray-100 text-gray-800"} px-4 py-2 max-w-xs break-all`}
                  >
                    <p>{message.text}</p>
                    <span className="text-sm text-gray-600">
                      {formatTime(message.createdAt)}
                    </span>
                    {message.senderId === userInfo.id && message.isRead && (
                      <span>
                        <BsCheckAll />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex">
            <input
              type="text"
              className="rounded-full py-2 px-4 mr-2 w-full"
              placeholder="Type a message..."
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <button
              type="submit"
              className="bg-[#1DBF73] text-white rounded-full px-4 py-2"
              onClick={sendMessage}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageContact;
