import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Foorter";


const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customerProducts } = useSelector((state) => state.customer);

  const product = customerProducts.find((product) => {
    if (product._id == id) {
      return true;
    }
    else {
      return false;
    }
  })


  if (!product || product.length == 0) {
    return (<>
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
        <h1 className="text-xl md:text-2xl font-semibold border border-black px-6 py-4 rounded-lg shadow">
          Product not found
        </h1>
      </div>
    </>)
  }


  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="min-h-screen bg-zinc-900 flex justify-center items-center p-6">
        <div className="bg-black w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden">


          <img
            src={`https://ecommerce.armanapp2.xyz/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-80 object-cover"
          />

          <div className="p-6">

            <h1 className="text-3xl font-bold text-white mb-3">
              {product.name}
            </h1>


            <p className="text-gray-400 mb-2">
              Brand: <span className="text-white font-medium">{product.brand}</span>
            </p>


            <p className="text-xl font-semibold text-white mb-3">
              ${product.price}
            </p>


            <p className="text-gray-400 mb-4">
              {"★".repeat(Math.round(product.rating || 0))}
              {"☆".repeat(5 - Math.round(product.rating || 0))}
            </p>


            <div className="border-t border-gray-300 pt-4">
              <h2 className="text-lg font-semibold text-white mb-2">
                Description
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { navigate("/") }} className="text-gray-400 hover:text-gray-900 font-semibold  px-6 py-4 ">
                Back to home page...
              </button>
            </div>


          </div>

        </div>



      </div>
      <Footer />
    </div>

  );

};

export default Description;