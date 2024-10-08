import { GET_USER_GIGS_ROUTE, GIG_ROUTES } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Index() {
  const [gigs, setGigs] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const {
          data: { gigs: gigsData },
        } = await axios.get(GET_USER_GIGS_ROUTE, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setGigs(gigsData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  const deleteGig = async (id) => {
    try {
      await axios.delete(`${GIG_ROUTES}/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      setGigs(gigs.filter((gig) => gig.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-4 sm:px-8 lg:px-32">
      <h3 className="m-5 text-xl sm:text-2xl font-semibold">All your Gigs</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Name</th>
              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Category</th>
              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Price</th>
              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Delivery Time</th>
              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3"><span className="sr-only">Edit</span></th>
              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3"><span className="sr-only">Delete</span></th>
            </tr>
          </thead>
          <tbody>
            {gigs.map(({ title, category, price, deliveryTime, id }) => {
              return (
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={id}>
                  <th scope="row" className="px-4 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {title}
                  </th>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">{category}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">{price}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">{deliveryTime}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 text-right">
                    <Link href={`/seller/gigs/${id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">
                    <button
                      className="border text-lg font-semibold px-4 py-2 sm:px-5 sm:py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
                      type="button"
                      onClick={() => deleteGig(id)}
                    >
                      Delete Gig
                    </button>
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

export default Index;