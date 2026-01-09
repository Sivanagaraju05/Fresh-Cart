import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "./store";
import "./Signing.css";

function Signing() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(loginUser(data));
    navigate("/");
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit(myFunc)}>
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

          <button type="submit">Sign In</button>
        </form>

        <p className="signup-text">
          New User? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signing;
