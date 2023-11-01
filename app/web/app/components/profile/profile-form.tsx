"use client";

import { useUpdateMe, useUserInfo } from "@/components/hooks";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ProfileUpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("FirstName is required"),
  lastName: Yup.string().required("LastName is required"),
});

function ProfileForm() {
  const { mutate: mutateMe, isLoading: meIsLoading } = useUpdateMe();

  const { user, update } = useUserInfo((state) => ({
    user: {
      firstName: state.firstName,
      lastName: state.lastName,
      id: state.id,
      signupMode: state.signupMode,
      createdAt: state.createdAt,
    },
    update: state.update,
  }));

  const initialValuesPassword = {
    oldPass: "",
    newPass: "",
    newPass2: "",
  };

  const initialValuesProfile = {
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const disabled = user.signupMode === "GOOGLE";

  const handleUpdate = () => {};

  const handleUpdateProfile = (form: typeof initialValuesProfile) => {
    mutateMe(form, {
      onSuccess() {
        update(form);
        toast("Profile Updated Successfully", { type: "success" });
      },
      onError() {
        toast("Error while update", { type: "error" });
      },
    });
  };

  return (
    <div className="flex items-center justify-center flex-wrap p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <Formik initialValues={initialValuesPassword} onSubmit={handleUpdate}>
          {(formik) => {
            const { errors, touched, handleChange, values, handleBlur } =
              formik;
            return (
              <Form>
                <div className="-mx-3 flex flex-col flex-wrap">
                  {disabled && (
                    <p className="mb-2">
                      Please update your google account password. This future is
                      for those who did not signup with google.😊
                    </p>
                  )}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="oldPass"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Old Password
                      </label>
                      <input
                        type="password"
                        disabled={disabled}
                        name="oldPass"
                        id="oldPass"
                        value={values.oldPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="newPassId"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPass"
                        id="newPassId"
                        disabled={disabled}
                        value={values.newPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="pass2Id"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Re-enter Password
                      </label>
                      <input
                        type="text"
                        name="newPass2"
                        disabled={disabled}
                        id="pass2Id"
                        value={values.newPass2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Reset Password
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="mx-auto w-full max-w-[550px] sm:mt-8 md:mt-0">
        <Formik
          initialValues={initialValuesProfile}
          onSubmit={handleUpdateProfile}
          validationSchema={ProfileUpdateSchema}
        >
          {(formik) => {
            const { errors, touched, handleChange, values, handleBlur } =
              formik;
            return (
              <Form>
                <div className="-mx-3 flex flex-col flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="fName"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="First Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.firstName && touched.firstName && (
                        <span className="error">{errors.firstName}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="lName"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Last Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.lastName && touched.lastName && (
                        <span className="error">{errors.lastName}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    disabled={meIsLoading}
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    {meIsLoading ? (
                      <img src="/spin.svg" className="w-4 mx-auto" />
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileForm;
