import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white mt-16 border-t border-zinc-800 ">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">


        <div>
          <h1 className="text-xl font-semibold tracking-wide">E-Commerce Website</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Premium Products
          </p>
        </div>


        <div className="flex gap-10">
          <div>
            <h2 className="text-sm font-medium mb-2">Shop</h2>
            <ul className="text-zinc-400 text-sm space-y-1">
              <li className="hover:text-white cursor-pointer" onClick={() => navigate("/")}>
                All Products
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigate("/orders")}>
                Orders
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigate("/cart")}>
                Cart
              </li>
            </ul>
          </div>




          <div className="text-center text-zinc-500 text-sm py-4 border-t border-zinc-800">
            © 2026 E-Commerce Website. All rights reserved.
          </div>
        </footer>
        );
};

        export default Footer;