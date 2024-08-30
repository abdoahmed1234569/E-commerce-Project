import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function ResetCode() {
  let navigate = useNavigate()
  const verifyCode = async (val) => {
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
    .then(({data}) => {
      console.log(data.status);
      if(data.status === 'Success') {
        navigate("/reset-password");
      }
    })
    .catch()
  }
  let { handleSubmit, handleChange, handleBlur, values, errors, isValid, dirty } = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required()
    }),
    onSubmit: verifyCode
  });
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="userCode"
              >
                Enter Code
              </label>
              <input
                value={values.resetCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                id="userCode"
                type="text"
                name='resetCode'
                placeholder="Code"
              />
            </div>
            {errors.resetCode ? 
              <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
                  role="alert">
                  <strong className="font-bold">{errors.resetCode}</strong>
              </div>
              : null}
            <button
              disabled={!(dirty && isValid)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
