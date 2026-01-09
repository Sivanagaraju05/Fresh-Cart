import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "./store";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert("✅ User Registered Successfully");
    navigate("/signing");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <input
            type="email"
            placeholder="abc@gmail.com"
            {...register("mail", { required: true })}
          />

          <label className="label-title">Gender:</label>
          <div className="radio-group">
            <label>
              <input type="radio" value="male" {...register("gender")} /> Male
            </label>
            <label>
              <input type="radio" value="female" {...register("gender")} /> Female
            </label>
          </div>

          <label className="label-title">Category:</label>
          <select {...register("category")} defaultValue="veg">
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
            <option value="milk">Milk Products</option>
            <option value="chocolates">Chocolates</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
