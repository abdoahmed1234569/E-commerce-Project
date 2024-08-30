import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";

export default function Allorders() {
  let { token } = useContext(userContext);
  const [order, setOrders] = useState([])
  const getMyOrders = async () => {
    await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${token}`)
    .then(({data}) => {
      setOrders(data[0].cartItems)
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    token && getMyOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="orders w-8/12 mx-auto my-36 mt-32">
        <h1 className="text-center text-3xl text-green-600">All Orders</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.map((ele) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={ele?.product?.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {ele?.product?.title}
                      </td>
                      <td className="px-6 py-4">
                        {ele?.product?.ratingsQuantity}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {ele?.price}
                      </td>
                      <td className="px-6 py-4">{ele?.count}</td>
                      <td className="px-6 py-4">{ele?.product?.brand.name}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
