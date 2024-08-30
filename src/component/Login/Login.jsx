import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let {setLogin} = useContext(userContext)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function handleRegister(param) {
    try {
      console.log(param);
      setLoading(true);
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",param);
      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setLogin(data.token);
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("enter valid email"),
    password: Yup.string().required().matches(/^[A-Z][a-z0-9]{6,8}$/)
  });
  let { values, handleChange, handleBlur, handleSubmit,errors, isValid, dirty} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
                Login Now
              </h2>
              {error ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800">
                  <span className="font-medium">{error}</span>
                </div>
              ) : null}
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      value={values.email}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                    {errors.email && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong className="font-bold">{errors.email}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      value={values.password}
                      id="password"
                      type="password"
                      autoComplete="password"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                    {errors.password && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong className="font-bold">{errors.password}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    disabled={!(isValid && dirty)}
                    className="flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  >
                    {loading ? (
                      <i className="fa fa-spinner fa-spin mx-3"></i>
                    ) : null}
                    Login
                  </button>
                  <button className="text-green-600"><Link to={'/forget-password'}>ForgetPassword</Link></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
