import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { GoPasskeyFill } from "react-icons/go";
import { BsApple, BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");
  const [displayPolicy, setDisplayPolicy] = useState(true);
  const [next, setNext] = useState(false)

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError("");
      try {
        await login(values.email, values.password);
        navigate("/");
      } catch (err) {
        setApiError(err.message || "Invalid email or password.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="lg:min-h-dvh h-dvh w-full bg-gray-950 overflow-y-auto p-4">
      <button
        className="size-11 cursor-pointer static bg-gray-200 rounded-full lg:fixed top-1 left-1"
        onClick={() => navigate("/")}
      />
      <div className="max-w-md lg:pt-36 p-5 h-full md:h-fit flex flex-col justify-evenly mx-auto">
        <div className="mb-5">
          <h4 className="text-white py-3 text-3xl font-medium">
            Sign in to Coinbase
          </h4>
          <p className="text-yellow-400 text-sm font-medium">
            Demo app – do not use your real password.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="space-y-5">
            {!next && <div>
              <Input
                label="Email"
                className="rounded-md text-gray-200"
                variant="outline"
                placeholder="Your Email Address"
                fullWidth
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-red-400 text-sm">{formik.errors.email}</p>
              )}
            </div>}

            {next && 
            <div>  <Input
                label="Password"
                type="password"
                className="rounded-md text-gray-200"
                variant="outline"
                placeholder="Your Password"
                fullWidth
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-red-400 text-sm">{formik.errors.password}</p>
              )}
            </div>}

            {apiError && (
              <p className="text-red-400 text-sm font-medium">{apiError}</p>
            )}

            {!next ? <Button
              type="button"
              onClick={()=> setNext(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-gray-900 py-3"
              variant="secondary"
              disabled={!formik.values.email}
            >
              { "Continue"}
            </Button>
            : <Button
              type="submit"
              onClick={()=> setNext(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-gray-900 py-3"
              variant="secondary"
              disabled={formik.isSubmitting }
            >
              {formik.isSubmitting ? "Sign in...": "Continue"}
            </Button>}
          </div>

          <div className="relative w-full py-8">
            <div className="w-full h-px bg-gray-700" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 text-gray-600 text-sm px-2">
              OR
            </p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="w-full py-4 px-7 flex items-center gap-2 font-medium rounded-full bg-slate-200/10 cursor-pointer hover:bg-gray-800 text-white justify-start"
            >
              <GoPasskeyFill size={18} />
              <p className="text-center w-full">Sign in with Passkey</p>
            </button>
            <button
              type="button"
              className="w-full py-4 px-7 flex items-center gap-2 font-medium rounded-full bg-slate-200/10 cursor-pointer hover:bg-gray-800 text-white justify-start"
            >
              <BsGoogle size={18} />
              <p className="text-center w-full">Sign in with Google</p>
            </button>
            <button
              type="button"
              className="w-full py-4 px-7 flex items-center gap-2 font-medium rounded-full bg-slate-200/10 cursor-pointer hover:bg-gray-800 text-white justify-start"
            >
              <BsApple size={18} />
              <p className="text-center w-full">Sign in with Apple</p>
            </button>
          </div>

          <div className="mt-5">
            <p className="text-white font-medium text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <p
        className="text-blue-500 py-4 text-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        Cancel Signing in
      </p>

      <div className="lg:py-4 mx-auto">
        <p className="text-xs text-gray-500 text-center px-4">
          By creating an account you certify that you are over the age of 18 and
          agree to our <span className="underline">Privacy Policy</span> and{" "}
          <span className="underline">Cookie Policy.</span>
        </p>
      </div>

      {displayPolicy && (
        <div className="hidden fixed bottom-0 w-full h-20 bg-gray-900 lg:flex items-center justify-center py-2">
          <div className="w-2xl flex justify-center gap-4 items-center">
            <p className="text-white text-sm">
              We use strictly necessary cookies to enable essential functions,
              such as security and authentication. For more information, see our
              <span className="text-blue-500 cursor-pointer"> Cookie Policy</span>.
            </p>
            <Button onClick={() => setDisplayPolicy(false)}>Dismiss</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signin;
