import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function ResetPassword() {
  let navigate = useNavigate()
  const ResetPass = async (val) => {
    await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val)
    .then((res) => {
      console.log(res);
      if(res.status === 200) {
        localStorage.setItem('userToken', res.data.token)
        navigate('/login')
      }
    })
    .catch()
  }
  let {handleSubmit, handleChange, handleBlur, values} = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Enter Valid Email'),
      newPassword: Yup.string().required().matches(/^[A-Z][a-z0-9]{6,8}$/)
    }),
    onSubmit: ResetPass
  });
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-center text-2xl font-bold mb-6">
            reset your account password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="newPassword"
                placeholder="password"
              />
            </div>
            <button
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
