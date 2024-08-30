import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function Checkout() {
  let {id} = useParams()
  async function handleRegister(param) {
    console.log(param);
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
      { shippingAddress: param },
      {
        headers: { token: localStorage.getItem("userToken") },
        params: { url: "http://localhost:5173/" },
      }
    )
    .then((res) => {
      location.href = res.data.session.url
    })
    .catch()
  }
  let { values, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: handleRegister,
  });
  return (
    <>
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
                Pay Now
              </h2>
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="details"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Details
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="details"
                      value={values.details}
                      id="details"
                      type="text"
                      autoComplete="details"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone"
                      value={values.phone}
                      id="phone"
                      type="tel"
                      autoComplete="phone"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="city"
                      value={values.city}
                      id="city"
                      type="text"
                      autoComplete="city"
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
