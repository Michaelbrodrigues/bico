// pages/seller-messages.js

import React from 'react';
import MessageContact from '../../components/Messages/MessageContact';
import axios from 'axios';
import { GET_PRE_TRANSACTION_MESSAGES } from '../../utils/constants';

export async function getServerSideProps(context) {
  const recipientId = context.query.recipientId;
  let initialMessages = [];

  try {
    const response = await axios.get(`${GET_PRE_TRANSACTION_MESSAGES}/${recipientId}`, {
      withCredentials: true,
    });
    initialMessages = response.data.messages;
  } catch (err) {
    console.error('Error fetching messages:', err);
  }

  return {
    props: {
      initialMessages,
    },
  };
}

const SellerMessagesPage = ({ initialMessages }) => {
  return <MessageContact initialMessages={initialMessages} />;
};

export default SellerMessagesPage;
