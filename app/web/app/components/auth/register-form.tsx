"use client";

import { LOGIN_PAGE, STRONG_PASSWORD_REGEX, VERIFY_PAGE } from "@/constant";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useCallback } from "react";
import { useRegisterMutation } from "@/components/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  firstName: Yup.string().required("FirstName is required"),
  lastName: Yup.string().required("LastName is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      STRONG_PASSWORD_REGEX,
      "Password must have at least 8 characters including: symbol, upper case, lower case and digit"
    ),
  password2: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function LoginForm() {
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
  };

  const { mutate: registerMutate, isLoading } = useRegisterMutation();
  const router = useRouter();

  const handleRegister = useCallback((form: typeof initialValues) => {
    registerMutate(form, {
      onSuccess() {
        router.push(VERIFY_PAGE);
      },
      onError(error: any) {
        const message: string =
          error?.response?.data?.message || error?.message;

        toast(message, { type: "error" });
      },
    });
  }, []);

  return (
    <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-xl">
        <div className="px-5 w-full">
          <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            Register in a few clicks, in order to save time Sign up with google
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={SignInSchema}
          >
            {(formik) => {
              const { errors, touched, handleChange, values, handleBlur } =
                formik;

              return (
                <Form className="mt-6 max-w-lg">
                  <div className="w-full">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}

                  <div className="mt-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your First Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.firstName && touched.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}

                  <div className="mt-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your Last Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.lastName && touched.lastName && (
                    <span className="error">{errors.lastName}</span>
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
                    {errors.password && touched.password && (
                      <div className="error flex shrink ">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="password2"
                      value={values.password2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Password"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                    />
                  </div>
                  {errors.password2 && touched.password2 && (
                    <span className="error">{errors.password2}</span>
                  )}

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  >
                    {isLoading ? (
                      <img src="/spin.svg" className="w-4 mx-auto" />
                    ) : (
                      "Register"
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
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 "
          >
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
