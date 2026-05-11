import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Reviews = () => {
  const { id } = useParams();
  const { customerProducts, isLoading } = useSelector((state) => state.customer);
  const [reviewError, changeReviewError] = useState(null);
  const [reviewLoad, changeReviewLoad] = useState(false);
  const { token, isLoggedIn, userType } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const reviewRef = useRef(null);
  const ratingRef = useRef(null);


  const product = customerProducts.find((product) => {
    if (product._id == id) {
      return true;
    }
    else {
      return false;
    }
  })





  const addReview = async () => {
    changeReviewLoad(true);
    const res = await fetch("https://ecommerce.armanapp2.xyz/addReview", {
      method: "POST",
      body: JSON.stringify({
        rating: Number(ratingRef.current.value),
        review: reviewRef.current.value,
        product_id: id
      }),
      headers:
      {
        "Content-Type": "application/json",
        Authentication: "Bearer" + " " + token
      }
    });

    const data = await res.json();

    if (res.status != 201) {
      changeReviewLoad(false);
      changeReviewError(data.message);
      return;
    }


    changeReviewLoad(false);
    navigate("/");



  }





  if (isLoggedIn == false || userType == "seller") {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
        <h1 className="text-xl md:text-2xl font-semibold border border-black px-6 py-4 rounded-lg shadow">
          Please Log in as a customer to review this product
          <button onClick={() => { navigate("/") }} className="text-blue-600 font-semibold  px-6 py-4 ">
            Back to home page...
          </button>
        </h1>
      </div>
    );
  }

  if (customerProducts.length == 0) {
    navigate("/");
    return;
  }




  return (
    < div className="min-h-screen bg-gray-100 flex justify-center items-start py-10" >
      {reviewError}
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">

        {reviewError && (
          <p className="text-red-500 mb-4">{reviewError}</p>
        )}

        {product.reviews.length === 0 ? (
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            No Reviews yet. Be the first!
          </h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {"★".repeat(Math.round(Number(product.rating)))}
              {"☆".repeat(5 - Math.round(Number(product.rating)))}
            </h1>

            <ul className="space-y-4 mb-6">
              {product.reviews.map((review, index) => (
                <li
                  key={index}
                  className="border border-gray-300 p-4 rounded-xl bg-gray-50"
                >
                  <h2 className="font-semibold text-gray-900">
                    {review.userName}
                  </h2>
                  <p className="text-gray-700">
                    {"★".repeat(Math.round(Number(review.rating)))}
                    {"☆".repeat(5 - Math.round(Number(review.rating)))}
                  </p>
                  <p className="text-gray-600 mt-1">{review.review}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="flex flex-col gap-3">
          <select
            ref={ratingRef}
            className="border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="1">1 ★</option>
            <option value="2">2 ★★</option>
            <option value="3">3 ★★★</option>
            <option value="4">4 ★★★★</option>
            <option value="5">5 ★★★★★</option>
          </select>
          <input
            type="text"
            placeholder="Write your review..."
            ref={reviewRef}
            className="border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {reviewLoad ? <div className="flex justify-center"><Loading /> </div> : <button
            onClick={addReview}
            className="bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Submit Your Review
          </button>}

        </div>
      </div>
    </div >
  );
};

export default Reviews;