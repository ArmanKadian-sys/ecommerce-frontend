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
      {errors.map((error) => {
        return (
          <ul><li>{error}</li></ul>
        )
      })}
      <input type="text" placeholder="name" ref={name} />
      <input type="text" placeholder="email" ref={email} />
      <input type="text" placeholder="password" ref={password} />
      <input type="text" placeholder="confirm_password" ref={confirm_password} />

      <select name="userType" ref={userType}>
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
      </select>

      <button onClick={onSubmit}>Submit</button>

      <button onClick={() => { navigate("/auth/login") }}>Login</button>
    </>
  )
}

export default Register;