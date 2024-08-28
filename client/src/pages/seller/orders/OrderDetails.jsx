// Your component file (e.g., OrderDetails.jsx)

import React, { useState } from "react";
import axios from "axios";
import { CANCEL_ORDER_ROUTE } from "../../utils/constants";

const OrderDetails = ({ orderId }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancellationError, setCancellationError] = useState(null);

  const handleCancelOrder = async () => {
    try {
      setIsCancelling(true);

      // Make a request to the cancel order endpoint
      await axios.put(`${CANCEL_ORDER_ROUTE}/${orderId}`, null, {
        withCredentials: true,
      });

      // Handle success (e.g., update UI, show a success message)
      // For example, you might redirect the user or show a success message

    } catch (err) {
      console.error(err);

      // Handle error (e.g., show an error message)
      setCancellationError("Error cancelling the order. Please try again.");

    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div>
      {/* Your UI for displaying order details */}
      {/* ... */}

      {/* Button to cancel the order */}
      <button
        onClick={handleCancelOrder}
        disabled={isCancelling}
      >
        {isCancelling ? "Cancelling..." : "Cancel Order"}
      </button>

      {/* Display an error message if cancellation fails */}
      {cancellationError && (
        <p style={{ color: "red" }}>{cancellationError}</p>
      )}
    </div>
  );
};

export default OrderDetails;
