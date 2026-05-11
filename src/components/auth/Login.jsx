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
    <>
      {errors}
      <h1>Login Page</h1>
      <input type="text" placeholder="email" ref={email} />
      <input type="text" placeholder="password" ref={password} />
      <button onClick={handleSubmit}>Login</button>
      <button onClick={() => { navigate("/auth/register") }}>Register</button>
    </>
  )
}

export default Login;