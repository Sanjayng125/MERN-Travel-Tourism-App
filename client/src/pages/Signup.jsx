import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/signup`, formData);
      if (res?.data?.success) {
        alert(res?.data?.message);
        navigate("/login");
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border border-black rounded-lg p-2 w-72 h-fit gap-2 sm:w-[320px] bg-white bg-opacity-60">
          <h1 className="text-3xl text-center font-semibold">Signup</h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold">
              Address:
            </label>
            <textarea
              maxLength={200}
              type="text"
              id="address"
              className="p-1 rounded border border-black resize-none bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>
          <p className="text-blue-700 text-sm hover:underline">
            <Link to={`/login`}>Have an account? Login</Link>
          </p>
          <button className="p-3 text-white bg-slate-700 rounded hover:opacity-95">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
