"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLoginMutation, useUserInfo } from "@/components/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGE, TOKEN_KEY, VERIFY_PAGE } from "@/constant";
import Cookies from "js-cookie";
import { BASE_URL } from "@/config";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum"),
});

function LoginForm() {
  const { mutate: loginMutate, isLoading } = useLoginMutation();
  const setUser = useUserInfo((state) => state.setUser);

  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(
    (form: typeof initialValues) => {
      loginMutate(form, {
        onError(error: any) {
          const message: string =
            error?.response?.data?.message || error?.message;

          if (message.includes("been verified")) {
            router.push(VERIFY_PAGE);
            return;
          }
          toast(message, { type: "error" });
        },
        onSuccess(response) {
          Cookies.set(TOKEN_KEY, response.access_token);
          setUser(response);
          router.push(DASHBOARD_PAGE);
        },
      });
    },
    [loginMutate, router]
  );

  const handleLoginWithGoogle = () => {
    window.open(`${BASE_URL}/auth/google`);
  };

  return (
    <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you have an account, please login
          </p>
          <Formik
            onSubmit={handleLogin}
            validationSchema={SignInSchema}
            initialValues={initialValues}
          >
            {(formik) => {
              const { errors, touched, handleChange, values, handleBlur } =
                formik;

              return (
                <Form className="mt-6">
                  <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}

                  <div className="mt-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Password"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  >
                    {isLoading ? (
                      <img src="/spin.svg" className="w-4 mx-auto" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>

          <button
            disabled={isLoading}
            onClick={handleLoginWithGoogle}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 "
          >
            <img src="/google.svg" className="w-8" />
            <span className="ml-4">Login with Google</span>
          </button>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>{"If you don't have an account..."}</p>
            <Link
              href="/register"
              className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="w-1/2 md:block hidden ">
          <img
            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            className="rounded-2xl"
            alt="page img"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
