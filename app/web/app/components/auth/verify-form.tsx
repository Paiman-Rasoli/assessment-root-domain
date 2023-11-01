"use client";

import { useUserInfo, useVerifyMutation } from "@/components/hooks";
import { DASHBOARD_PAGE, TOKEN_KEY } from "@/constant";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const VerifySchema = Yup.object().shape({
  code: Yup.number()
    .typeError("Code must be a number")
    .required("Code is required"),
});

function VerifyForm() {
  const initialValues = {
    code: "",
  };

  const router = useRouter();
  const setUser = useUserInfo((state) => state.setUser);

  const { isLoading, mutate: verifyMutate } = useVerifyMutation();

  const handleVerify = useCallback((form: typeof initialValues) => {
    verifyMutate(form, {
      onError(error: any) {
        const message: string = error?.response?.data?.message;

        if (error?.response?.status === 403) {
          toast("Invalid code", { type: "error" });
        } else {
          toast(message, { type: "error" });
        }
      },
      onSuccess(response) {
        Cookies.set(TOKEN_KEY, response.access_token);
        setUser(response);
        router.push(DASHBOARD_PAGE);
      },
    });
  }, []);

  return (
    <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-xl">
        <div className="px-5 w-full">
          <h2 className="text-2xl font-bold text-[#002D74]">Verify Email</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            Please enter the code which we have sent you.
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleVerify}
            validationSchema={VerifySchema}
          >
            {(formik) => {
              const { errors, touched, handleChange, values, handleBlur } =
                formik;

              return (
                <Form className="max-w-md">
                  <div className="w-full mt-4">
                    <label className="block text-gray-700">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Code"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                    {errors.code && touched.code && (
                      <span className="error">{errors.code}</span>
                    )}
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  >
                    {isLoading ? (
                      <img src="/spin.svg" className="w-4 mx-auto" />
                    ) : (
                      "Finalize"
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default VerifyForm;
