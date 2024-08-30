import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function ForgetPassword() {
  let navigate = useNavigate()
  const SendCode = async (val) => {
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val);
    console.log(data);
    if(data.statusMsg === 'success') {
      navigate("/reset-code");
    }
  }
  let {handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid} = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Enter Valid Email')
    }),
    onSubmit: SendCode
  })
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email address"
              />
            </div>
            {touched.email && errors.email ? 
              <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
                  role="alert">
                  <strong className="font-bold">{errors.email}</strong>
              </div>
            : null}
            <button
              disabled={!(isValid && dirty)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
