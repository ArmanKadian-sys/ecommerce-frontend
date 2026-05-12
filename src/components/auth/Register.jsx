import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errors, changeErrors] = useState([]);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirm_password = useRef(null);
  const userType = useRef(null);

  const onSubmit = async () => {

    console.log("These are the name value", name.current.value);
    const nameSend = name.current.value;
    const emailSend = email.current.value;
    const passwordSend = password.current.value;
    const confirm_passwordSend = confirm_password.current.value;
    const userTypeSelect = userType.current.value;

    const response = await fetch("https://ecommerce.armanapp2.xyz/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          name: nameSend,
          email: emailSend,
          password: passwordSend,
          confirmPassword: confirm_passwordSend,
          userType: userTypeSelect
        }
      )
    });

    const data = await response.json();

    if (response.status == 422) {
      changeErrors([data.message]);
      return;
    }

    navigate("/auth/login");
  }

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Register
          </h1>

          {errors.length > 0 && (
            <div className="bg-zinc-800 border border-zinc-600 rounded-2xl p-4 mb-6 flex flex-col">
              these are erors
              {errors.map((error) => {
                return (
                  <ul >
                    <li className="text-red-400 text-sm">
                      {error},
                    </li>
                  </ul>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="Name"
              ref={name}
              className="bg-black border border-zinc-600 text-white px-5 py-4 rounded-2xl outline-none focus:border-white transition-all placeholder:text-zinc-500"
            />

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

            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirm_password}
              className="bg-black border border-zinc-600 text-white px-5 py-4 rounded-2xl outline-none focus:border-white transition-all placeholder:text-zinc-500"
            />

            <select
              name="userType"
              ref={userType}
              className="bg-black border border-zinc-600 text-white px-5 py-4 rounded-2xl outline-none focus:border-white transition-all"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>

            <button
              onClick={onSubmit}
              className="bg-white text-black font-semibold py-4 rounded-2xl hover:bg-zinc-300 transition-all duration-300"
            >
              Submit
            </button>

            <button
              onClick={() => {
                navigate("/auth/login");
              }}
              className="border border-zinc-500 text-zinc-300 py-4 rounded-2xl hover:bg-zinc-800 hover:text-white transition-all duration-300"
            >
              Login
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register;