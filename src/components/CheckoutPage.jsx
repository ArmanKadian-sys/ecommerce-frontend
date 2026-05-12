import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, emptyCart, addOrder, updateCart } from "../store/customerSlice";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./Foorter";

const CheckoutPage = () => {

  const { cart, customerProducts, isLoadingDetails } = useSelector((state) => { return state.customer });
  const { token, isLoggedIn, userType } = useSelector((state) => { return state.auth });
  const [cartError, changeCartError] = useState('');
  const [orderError, changeOrderError] = useState('');
  const [isLoadingAddOrder, changeisLoadingAddOrder] = useState(false);
  const [isLoadingRemoveCart, changeisLoadingRemoveCart] = useState({
    now: false,
    id: null
  });
  const [cartEmptyError, changeCartEmptyError] = useState('');
  const dispatch = useDispatch();
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  let totalPrice = 0;





  cart.forEach((item) => {
    const product = customerProducts.find((product) => {
      if (product._id == item) {
        return true;
      }
      else {
        return false;
      }
    })
    console.log(totalPrice);
    totalPrice = Number(product.price) + totalPrice;
  })




  const addOrders = async () => {

    changeisLoadingAddOrder(true);
    const res = await fetch("https://ecommerce.armanapp2.xyz/addOrder", {
      method: "POST",
      body: JSON.stringify({
        products: cart,
        totalPrice
      }),
      headers:
      {
        "Content-Type": "application/json",
        Authentication: "Bearer" + " " + token
      }
    });

    const data = await res.json();

    if (res.status != 201 && res.status != 409) {
      changeOrderError(data.message);
      changeisLoadingAddOrder(false);
      return;
    }

    if (res.status == 409) {
      console.log("This is data", data);
      dispatch(updateCart(data.cartItems));
      notify(data.message);
      changeisLoadingAddOrder(false);
      return;
    }


    const result = await fetch("https://ecommerce.armanapp2.xyz/emptyCart", {
      method: "POST",
      headers:
      {
        Authentication: "Bearer" + " " + token
      }
    });

    const response = await result.json();

    if (result.status != 201) {
      changeCartEmptyError(data.message);
      changeisLoadingAddOrder(false);
      return;
    }




    dispatch(emptyCart());
    dispatch(addOrder(data.order));
    changeisLoadingAddOrder(false);


    navigate("/orders");


  }


  const removeCartItem = async (id, e) => {
    console.log(e);
    changeisLoadingRemoveCart({ now: true, id });
    const res = await fetch("https://ecommerce.armanapp2.xyz/removeFromCart", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers:
      {
        "Content-Type": "application/json",
        Authentication: "Bearer" + " " + token
      }
    });

    const data = await res.json();

    if (res.status != 201 && res.status != 409) {
      changeisLoadingRemoveCart({ now: false, id });
      changeCartError(data.message);
      return;
    }

    if (res.status == 409) {
      dispatch(updateCart(data.cartItems));
      notify(data.message);
      changeisLoadingRemoveCart({ now: false, id });
      return;
    }


    dispatch(removeFromCart(id));
    changeisLoadingRemoveCart({ now: false, id });


  }

  if (isLoadingDetails == true) {
    navigate("/");
  }

  if (isLoggedIn == false || userType == "seller") {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4">
        <h1 className="text-xl md:text-2xl font-semibold border border-black px-6 py-4 rounded-lg shadow">
          You are not yet logged in or you are a seller, You can
          <p> </p>
          <a className="m-2" href="/" className="text-blue-500 hover:text-blue-700" onClick={() => { navigate("/") }}>
            Go to home page...
          </a>
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-zinc-900 text-white ">
      <div className="min-h-screen  bg-zinc-900 text-white px-4 py-10 md:px-10">
        <ToastContainer />
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl p-8">
            <h1 className="text-3xl font-semibold tracking-tight border-b border-zinc-700 pb-4 mb-6">
              Checkout Page
            </h1>
            {cartEmptyError}
            {orderError}
            {cartError}
            {cart.length == 0 ? (
              <div className="text-center py-10 border border-dashed border-zinc-700 rounded-xl">
                <h1 className="text-xl text-zinc-400">Your cart is empty</h1>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-semibold mb-6">
                  This is your cart
                </h1>

                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5  flex flex-col gap-6  items-center justify-between hover:shadow-lg hover:shadow-black/30 transition">
                  {cart.map((item) => {
                    const product = customerProducts.find((product) => {
                      if (product._id == item) {
                        return true;
                      } else {
                        return false;
                      }
                    });

                    return (
                      <div
                        className="border w-full border-black rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-black shadow-sm"
                      >
                        <div className="flex flex-col md:flex-row gap-4 md:items-center flex-1">
                          <div className="w-full md:w-28 aspect-square rounded-xl overflow-hidden bg-zinc-800">
                            <img
                              src={`https://ecommerce.armanapp2.xyz/${product.imageUrl}`}
                              className="w-full h-full object-cover"
                              alt="Product Image"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-semibold">{product.name}</h1>
                            <h1 className="text-sm bg-zinc-700 px-3 py-1 rounded-md w-fit">
                              ${product.price}
                            </h1>
                          </div>
                        </div>


                        {isLoadingRemoveCart.now == true && isLoadingRemoveCart.id == product._id ? <Loading />
                          :
                          <button
                            onClick={(e) => {
                              removeCartItem(item, e);
                            }}
                            className="p-3 rounded-full border border-zinc-700 hover:bg-white hover:text-black transition"
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
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        }


                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-black pt-6 flex flex-col gap-4">
                  {cartError && (
                    <p className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                      {cartError}
                    </p>
                  )}

                  {orderError && (
                    <p className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                      {orderError}
                    </p>
                  )}

                  {cartEmptyError && (
                    <p className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                      {cartEmptyError}
                    </p>
                  )}

                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 border border-zinc-700 rounded-xl p-5 bg-zinc-900">
                    <h1 className="text-2xl font-semibold">
                      Total Price: ${totalPrice}
                    </h1>


                    {isLoadingAddOrder ? <Loading />
                      :
                      <button
                        onClick={addOrders}
                        className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 active:scale-95 transition"
                      >
                        <p>Place Order</p>
                      </button>
                    }


                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div >
      <Footer />
    </div>


  );
}


export default CheckoutPage;