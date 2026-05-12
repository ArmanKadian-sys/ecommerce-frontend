import { useRef, useState } from "react";
import { login } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, changeError] = useState([]);
  const email = useRef(null);
  const password = useRef(null);


  const handleSubmit = async () => {
    const emailSend = email.current.value;
    const passwordSend = password.current.value;
    console.log(emailSend);
    console.log(passwordSend);


    const response = await fetch("https://ecommerce.armanapp2.xyz/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          email: emailSend,
          password: passwordSend,
        }
      )
    });


    const data = await response.json();

    if (response.status == 422) {
      changeError(data.message);
      return;
    }

    dispatch(login(data));
    navigate("/");

  }


  return (
    <><div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">



        <h1 className="text-4xl font-bold text-white mb-8 text-center flex flex-col">
          Login Page
          {errors && (
            <div className=" text-white">
              {errors}
            </div>
          )}
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Email"
            ref={email}
            className="bg-black border border-zinc-600 text-white px-5 py-4 rounded-2xl outline-none focus:border-white transition-all placeholder:text-zinc-500"
          />

          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="bg-black border border-zinc-600 text-white px-5 py-4 rounded-2xl outline-none focus:border-white transition-all placeholder:text-zinc-500"
          />

          <button
            onClick={handleSubmit}
            className="bg-white text-black font-semibold py-4 rounded-2xl hover:bg-zinc-300 transition-all duration-300"
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate("/auth/register");
            }}
            className="border border-zinc-500 text-zinc-300 py-4 rounded-2xl hover:bg-zinc-800 hover:text-white transition-all duration-300"
          >
            Register
          </button>

        </div>
      </div>
    </div>
      {/* {errors}
      <h1>Login Page</h1>
      <input type="text" placeholder="email" ref={email} />
      <input type="text" placeholder="password" ref={password} />
      <button onClick={handleSubmit}>Login</button>
      <button onClick={() => { navigate("/auth/register") }}>Register</button> */}
    </>
  )
}

export default Login;