import { useDispatch, useSelector } from "react-redux";
import { deleteSellerProduct, fetchSellerProducts } from "../store/sellerSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "./Loading";


const DisplaySellerProducts = () => {

  const [deleteError, changeDeleteError] = useState(null);

  const { isLoading, sellerProducts, errors } = useSelector((state) => { return state.seller });
  const { userType, token, isLoggedIn } = useSelector((state) => { return state.auth });
  const [removeLoad, changeRemoveLoad] = useState({ now: false, id: null });
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  useEffect(() => { dispatch(fetchSellerProducts()) }, []);

  const handleDelete = async (id) => {
    changeRemoveLoad({ now: true, id: id });
    const response = await fetch(`https://ecommerce.armanapp2.xyz/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authentication: "Bearer" + " " + `${token}`
      }
    });

    const data = await response.json();

    if (response.status == 500) {
      changeDeleteError(data.message);
      changeRemoveLoad({ now: false, id: id });
      return;
    }

    if (response.status == 409) {
      notify(data.message);
      changeRemoveLoad({ now: false, id })
      return;
    }


    changeRemoveLoad({ now: false, id: id });
    dispatch(deleteSellerProduct(id));


  }


  if (isLoading) {
    return (<div className="flex justify-center mt-50">
      <Loading />
    </div>)
  }


  if (isLoggedIn == false || userType == "customer") {
    return (<>
      <h1>You are not yet Logged In or You are a customer</h1>
    </>)
  }



  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 py-8 ">
        <h1 className="text-black text-center mb-2">{errors}</h1>
        <h1 className="text-black text-center mb-4">{deleteError}</h1>
        {sellerProducts.length == 0 ? <h1 className="text-center text-2xl font-semibold mb-6 text-black">You don't have any products at the moment</h1> : <h1 className="text-center text-3xl font-bold mb-8 text-black">Here are your products</h1>}
        {sellerProducts ? sellerProducts.map((product) => {
          return (
            <div className="flex items-center justify-between border border-black rounded-lg p-4 mb-4 shadow">

              <div className="flex items-center gap-4">
                <img
                  src={`https://ecommerce.armanapp2.xyz/${product.imageUrl}`}
                  className="w-20 h-20 object-cover border border-black rounded"
                />
                <li className="list-none text-lg font-medium text-black">{product.name}</li>
              </div>

              {removeLoad.now && product._id == removeLoad.id ? <div className="flex justify-center">
                <Loading />
              </div>
                :
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition" onClick={() => { handleDelete(product._id) }}>Delete This Product</button>
              }


            </div>
          )
        })
          : <h1 className="text-center text-xl text-black">No Products to Display</h1>}
      </div>
    </>
  )


}

export default DisplaySellerProducts;