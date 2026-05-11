import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const CartButton = ({ funcPlus, funcRemove, id }) => {

  const { cart } = useSelector((state) => state.customer);
  const cartNumber = cart.filter((item) => {
    if (item == id) {
      return true;
    }
    else {
      return false;
    }
  }).length;

  return (
    <div className="flex items-center justify-between w-full p-5">
      <button onClick={() => { funcPlus(id) }} className="p-2 rounded-full text-2xl text-amber-50 hover:bg-gray-200  hover:text-black active:scale-90 transition">
        <CiCirclePlus />
      </button>

      <p className="flex-1 text-center text-white text-sm font-semibold">{cartNumber}</p>

      <button onClick={() => { funcRemove(id) }} className="p-2 rounded-full text-amber-50 text-2xl hover:bg-gray-200 hover:text-black active:scale-90 transition">
        <CiCircleMinus />
      </button>
    </div>
  )

}

export default CartButton;