import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "@/utils/postData";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    // Assume login is successful
    localStorage.setItem("isLoggedin", "true");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await postData("auth/login", formData);
      console.log(response.msg);
      if (response.msg === "Login successful.") {
        try {
          localStorage.setItem("token", response.token);
          console.log("Data stored successfully");
        } catch (err) {
          console.error("Error storing data in localStorage:", err);
        }
        handleLogin();
        navigate("/");
      } else {
        setError(response.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen main-gradient flex bg-black m-auto justify-center">
      <form
        className="flex flex-col w-96 bg-white text-black my-auto p-2 border-[1px] py-8 rounded-lg px-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl main-font-color poppins-semibold mb-3">
          <span className="text-xl text-zinc-800 ">Login</span>
        </h1>
        <hr className="mb-5 border-black" />

        {error && (
          <div className="text-red-500 underline mx-auto mb-4">{error}</div>
        )}

        <label htmlFor="email" className="text-black">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 p-2 border rounded w-full"
        />

        <label htmlFor="password" className="text-black">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-2 p-2 border rounded w-full"
        />

        <Button
          className={`main-gradient py-2 text-white rounded-full poppins-medium mt-8 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
          <p className="text-xs text-center text-zinc-500">New user?</p>
          <Link to="/signup" className="text-sm underline text-blue-600">
            Create new Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
