import { useStateProvider } from "../../context/StateContext";
import { HOST } from "../../utils/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Reviews() {
  const [{ gigData }] = useStateProvider();
  const [averageRatings, setAverageRatings] = useState("0");

  useEffect(() => {
    if (gigData && gigData.reviews.length) {
      let avgRating = 0;
      gigData.reviews.forEach(({ rating }) => (avgRating += rating));
      setAverageRatings((avgRating / gigData.reviews.length).toFixed(1));
    }
  }, [gigData]);

  return (
    <>
      {gigData && (
        <div className="mb-10 w-full p-4 sm:p-6 lg:p-8">
          <h3 className="text-xl sm:text-2xl my-5 font-semibold text-[#404145]">Reviews</h3>

          {/* Reviews Summary */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5 items-center">
            <h5 className="text-sm sm:text-base">{gigData.reviews.length} reviews for this Gig</h5>
            <div className="flex items-center gap-2 text-yellow-500">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      Math.ceil(averageRatings) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>{averageRatings}</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex flex-col gap-6">
            {gigData.reviews.map((review) => (
              <div
                className="flex flex-col sm:flex-row gap-4 border-t pt-6 items-start sm:items-center"
                key={review.id}
              >
                {/* Reviewer Profile Image */}
                <div className="flex-shrink-0">
                  {review.reviewer.profileImage ? (
                    <Image
                      src={HOST + "/" + review.reviewer.profileImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full">
                      <span className="text-xl text-white">
                        {review.reviewer.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex flex-col gap-2 w-full">
                  <h4 className="text-sm sm:text-base font-semibold">{review.reviewer.fullName}</h4>

                  {/* Star Ratings */}
                  <div className="flex items-center gap-2 text-yellow-500">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${
                            review.rating >= star ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm sm:text-base">{review.rating}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-[#404145] text-sm sm:text-base leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
