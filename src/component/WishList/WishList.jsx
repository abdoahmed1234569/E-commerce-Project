import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../context/CartContext"
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function WishList() {
  let { getProductsFromWishList, AddToCart, removeProductsFromWishList } = useContext(cartContext);
  const [product, setProduct] = useState([])
  const getProduct = async () => {
    let { data } = await getProductsFromWishList();
    console.log(data.data);
    setProduct(data?.data)
  };
  const addProductItem = async (id) => {
    let response = await AddToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  const removeProduct = async (id) => {
    let { data } = await removeProductsFromWishList(id);
    setProduct(data?.data);
  };
  useEffect(() => {
    getProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="w-8/12 mx-auto my-36">
      {product?.length > 0 ? (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-center text-3xl text-green-600">
                My Wish List
              </h1>
            </div>
          </div>
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
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product?.map((ele) => {
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img
                            src={ele?.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full mb-7"
                            alt="Apple Watch"
                          />
                          <a
                            onClick={() => addProductItem(ele?.id)}
                            className="font-medium btn cursor-pointer whitespace-nowrap"
                          >
                            Add To Cart
                          </a>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {ele?.title}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {ele?.price}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            onClick={() => removeProduct(ele?.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        product.length == 0 ? <Loader /> : <h1 className="text-3xl text-green-800 font-medium text-center">
            No Wish List
          </h1>
      )}
    </div>
  );
}
