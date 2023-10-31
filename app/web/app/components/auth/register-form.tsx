"use client";

import { LOGIN_PAGE } from "@/constant";
import Link from "next/link";
import { FormEventHandler, useCallback, useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
    },
    [formData]
  );

  return (
    <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div className="px-5 w-full">
          <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            Register in a few clicks, in order to save time Signup with google
          </p>
          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                value={formData["email"]}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                value={formData["password"]}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              Register
            </button>
          </form>

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
            <img src="/google.svg" className="w-8" />
            <span className="ml-4">Sign Up With Google</span>
          </button>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>{"Already have an account?"}</p>
            <Link
              href={LOGIN_PAGE}
              className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
