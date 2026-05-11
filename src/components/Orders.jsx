import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Footer from "./Foorter";


const Orders = () => {
  const { orders, customerProducts, isLoadingDetails } = useSelector((state) => { return state.customer });
  const navigate = useNavigate();
  const { userType, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoadingDetails == true) {

    navigate("/")
    return;
  }





  return (
    <>
      {isLoggedIn == false || userType == "seller" ? (
        <h1 className="bg-zinc-900 text-white p-4 border border-zinc-700 rounded-xl text-center">
          You are not yet Logged In or You are a seller, You can
          <a className="ml-2 text-blue-400 hover:text-blue-300" href="/" onClick={() => { navigate("/") }}>
            Go to home..
          </a>
        </h1>
      ) : orders.length == 0 ? (
        <h1 className="bg-zinc-900 text-zinc-400 p-4 border border-zinc-700 rounded-xl text-center">
          You Haven't ordered anything yet!!
        </h1>
      ) : (
        <div className="min-h-screen bg-zinc-900 text-white ">
          <ul className="bg-zinc-900 text-white min-h-screen  border-zinc-700 p-8">
            {orders.map((order) => {
              return (
                <li className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 shadow-lg hover:shadow-black/40 transition mb-4 ml-4 mr-4 md:mx-auto" key={order._id}>

                  <p className="font-semibold text-lg">
                    Date: {new Date(Number(order.date)).toLocaleDateString("en-AU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>

                  <p className="mb-3 text-zinc-300">
                    Total: ${order.totalPrice}
                  </p>

                  {order.products.map((id) => {
                    let product = customerProducts.find(
                      (product) => product._id == id
                    );

                    return (
                      <div className="border-t border-zinc-700 mt-3 pt-3 flex items-center gap-4">

                        <img
                          src={`https://ecommerce.armanapp2.xyz/${product.imageUrl}`}
                          alt={product?.name}
                          className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
                        />

                        <div className="flex flex-col">
                          <p className="font-medium">{product?.name}</p>
                          <p className="text-sm text-zinc-400">${product?.price}</p>
                        </div>

                      </div>
                    );
                  })}
                </li>
              );
            })}

          </ul>
          <Footer />
        </div>

      )}

    </>
  );
}


export default Orders;