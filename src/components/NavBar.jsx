import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { fetchCustomerDetails } from "../store/customerSlice";
import { useEffect } from "react";

const NavBar = () => {
  const { userType, isLoggedIn } = useSelector((state) => state.auth);
  const { detailsError, cart } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userType == "customer") {
      dispatch(fetchCustomerDetails());
    }
  }, [dispatch, isLoggedIn, userType]);

  return (
    <>
      {detailsError ? (
        <h1>{detailsError}</h1>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 bg-black text-white shadow-md gap-4">
          <h1 className="text-2xl font-semibold">E commerce</h1>

          {isLoggedIn ? (
            userType == "seller" ? (
              <div className="flex items-center gap-5">
                <button
                  onClick={() => navigate("/add")}
                  className="hover:text-gray-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>Add Product</p>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="hover:text-gray-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <p>Your Products</p>
                </button>

                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-5">
                <button
                  onClick={() => navigate("/cart")}
                  className="hover:text-gray-200 flex items-center gap-1 relative"
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>

                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-1.5 py-0.5 rounded-full border border-black">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <p>Cart</p>
                </button>

                <button
                  onClick={() => navigate("/orders")}
                  className="hover:text-gray-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                  <p>Orders</p>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="hover:text-gray-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p>Products</p>
                </button>

                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Logout
                </button>
              </div>
            )
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/auth/login")}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;