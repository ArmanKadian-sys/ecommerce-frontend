import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCustomerProducts, removeFromCart, updateCart } from "../store/customerSlice";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import { redirect, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineReviews } from "react-icons/md";
import { LuExpand } from "react-icons/lu";
import { FaCartPlus } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import img from "../assets/HeroImage.png";
import Footer from "./Foorter";

const DisplayCustomerProducts = () => {
  const [cartError, changeCartError] = useState('');
  const { isLoading, customerProducts, errors, cart } = useSelector((state) => { return state.customer });
  const { isLoggedIn, token } = useSelector((state) => { return state.auth });
  const [cartLoad, changeCartLoad] = useState({ now: false, id: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => { dispatch(fetchCustomerProducts()); }, [])

  const remove_from_cart = async (id) => {

    changeCartLoad({ now: true, id });

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
      changeCartLoad({ now: false, id });
      changeCartError(data.message);
      return;
    }

    if (res.status == 409) {
      dispatch(updateCart(data.cartItems));
      notify(data.message);
      changeCartLoad({ now: false, id });
      return;
    }


    dispatch(removeFromCart(id));
    changeCartLoad({ now: false, id });


  }



  const add_to_cart = async (id) => {
    changeCartLoad({ now: true, id });
    const res = await fetch("https://ecommerce.armanapp2.xyz/addToCart", {
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
      changeCartLoad({ now: false, id });
      changeCartError(data.message);
      return;
    }

    if (res.status == 409) {
      dispatch(updateCart(data.cartItems));
      notify(data.message);
      changeCartLoad({ now: false, id });
      return;
    }


    dispatch(addToCart(id));
    changeCartLoad({ now: false, id });

  }

  if (isLoading) {
    return (<div className="flex items-center justify-center h-screen bg-gray-100">
      <Loading />
    </div>)

  }

  return (

    <div className="min-h-screen w-full bg-zinc-900">



      <div className="w-full h-200 relative overflow-hidden ">


        <img src={img} className="w-full h-full object-cover" />


        <div className="absolute inset-0 bg-black/60"></div>


        <div className="absolute inset-0 flex flex-col justify-center px-6">

          <h1 className="text-white text-6xl font-semibold tracking-wide">
            Premium Collection
          </h1>

          <p className="text-zinc-300 text-lg mt-1">
            Discover high-quality products
          </p>

          <a className="mt-4 w-fit px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition duration-300" href="#products">Explore Products</a>

        </div>
      </div>



      {errors}
      {cartError}
      <ToastContainer />
      <div className="text-center mt-12 mb-8">
        <h1 className="text-4xl font-semibold text-white tracking-tight">
          Products
        </h1>
        <div className="w-20 h-0.5 bg-white mx-auto mt-3 opacity-70"></div>
      </div>
      <ul className="flex flex-wrap gap-16 px-4 pt-20" id="products">
        {customerProducts ? customerProducts.map((product) => {
          return (
            <div>

              <li className="w-60 list-none flex flex-col gap-1 shadow-xl/20  pb-0 bg-black">

                <div className="w-full h-40 aspect-square overflow-hidden relative">
                  <img src={`https://ecommerce.armanapp2.xyz/${product.imageUrl}`} className="w-full h-40 object-cover" />

                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      className="p-2 bg-black text-white rounded-xl shadow-md hover:bg-white hover:text-black hover:scale-95 transition"
                      onClick={() => navigate(`/review/${product._id}`)}
                    >
                      <MdOutlineReviews />
                    </button>

                    <button
                      className="p-2 bg-black text-white rounded-xl shadow-md hover:bg-white hover:text-black hover:scale-95 transition"
                      onClick={() => navigate(`/description/${product._id}`)}
                    >
                      <LuExpand />
                    </button>
                  </div>

                </div>

                <span className="text-lg font-semibold text-white mt-1 mb-1 ml-3">{product.name}</span>

                <div>
                  <span className="text-sm text-gray-500 mt-1 mb-1 ml-3"> By {product.brand}</span>
                  <span className="inline-block w-fit bg-gray-500 text-black text-xs font-sm px-3 py-1 rounded-full mt-1 mb-1 ml-3">{product.category}</span>
                </div>



                <div className="flex gap-2">
                  <span className="flex gap-2 items-center mt-1 mb-1 ml-3">
                    {product.reviews.length === 0 ? (
                      <p className="text-zinc-400">Not Rated</p>
                    ) : (
                      <p>
                        <span className="text-yellow-400">
                          {"★".repeat(Math.round(Number(product.rating)))}
                        </span>
                        <span className="text-zinc-600">
                          {"☆".repeat(5 - Math.round(Number(product.rating)))}
                        </span>
                      </p>
                    )}
                  </span>
                </div>







                {isLoggedIn ?
                  !(cartLoad.now == true && product._id == cartLoad.id) ?
                    cart.includes(product._id) ?
                      <CartButton funcPlus={add_to_cart} funcRemove={remove_from_cart} id={product._id} />
                      :
                      <button onClick={() => add_to_cart(product._id)} className="mt-2 w-full bg-black text-white font-medium py-2 px-4  border border-black shadow-sm hover:bg-white hover:text-black transition duration-200 active:scale-95 flex items-center justify-center gap-2">

                        <span>Add to Cart</span> <FaCartPlus />


                      </button>
                    :
                    <div className="flex justify-center">
                      <Loading />
                    </div>
                  :
                  <></>
                }

              </li>
            </div>
          )
        })
          : <h1 className="text-white">No Products to Display</h1>}
      </ul>
      <Footer />

    </div>
  )
}

export default DisplayCustomerProducts;