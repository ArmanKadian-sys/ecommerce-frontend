import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AddProduct = () => {
  const name = useRef(null);
  const brand = useRef(null);
  const price = useRef(null);
  const category = useRef(null);
  const description = useRef(null);
  const img = useRef(null);
  const { token, isLoggedIn, userType } = useSelector((state) => { return state.auth });
  const [addLoad, changeAddLoad] = useState(false);
  const [addError, changeAddError] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    changeAddLoad(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name.current.value);
    formData.append('brand', brand.current.value);
    formData.append('price', price.current.value);
    formData.append('description', description.current.value);
    formData.append('category', category.current.value);
    formData.append('image', img.current.files[0]);

    const response = await fetch(`https://ecommerce.armanapp2.xyz/products/add`, {
      method: "POST",
      body: formData,
      headers: {
        Authentication: "Bearer" + " " + `${token}`
      }
    });



    const data = await response.json();

    if (response.status != 201) {
      changeAddError(data.message);
      changeAddLoad(false);
    }



    name.current.value = '';
    brand.current.value = '';
    price.current.value = '';
    description.current.value = '';
    category.current.value = '';
    img.current.value = '';



    changeAddLoad(false);
    navigate("/");

  }


  if (isLoggedIn == false || userType == "customer") {
    return (<div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <h1 className="text-xl md:text-2xl font-semibold border border-black px-6 py-4 rounded-lg shadow">
        You are not yet logged in or you are a customer
      </h1>
    </div>)
  }

  return <div className="flex flex-col items-center">
    {addError}
    <h1 className="text-2xl font-bold mt-6 text-black">Add your Product</h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-md mx-auto mt-10 p-6 border border-black rounded-lg bg-white flex flex-col gap-4">

      <input type="text" placeholder="name" name="name" ref={name}
        className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black" />

      <input type="text" placeholder="brand" name="brand" ref={brand}
        className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black" />

      <input type="text" placeholder="price" name="price" ref={price}
        className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black" />

      <input type="text" placeholder="category" name="category" ref={category}
        className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black" />

      <input type="textarea" placeholder="description" name="description" ref={description}
        className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black" />

      <input type="file" placeholder="Image of the product" name="image" ref={img}
        className="border border-black p-2 rounded bg-white text-black" />
      {addLoad ? <div className="flex justify-center"><Loading /></div> : <input type="submit" value="Add Product"
        className="bg-black text-white py-2 rounded cursor-pointer hover:bg-white hover:text-black border border-black transition" />}


    </form>
  </div>
}

export default AddProduct;