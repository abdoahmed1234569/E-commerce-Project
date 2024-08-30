import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Loader from './../Loader/Loader';
import { Link } from "react-router-dom";
import CategorySlider from "../categorySlider/categorySlider";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Home() {
  let {data,isLoading} = useQuery({queryKey: ['recentProduct'], queryFn: getProducts})
  let { addProductToWishList, removeProductsFromWishList } = useContext(cartContext);
  let { AddToCart } = useContext(cartContext);
  const [flag, setFlag] = useState(false)
  const handleFlag = () => {
    setFlag(!flag)
  }
  const addProductItem = async(id) => {
    let response = await AddToCart(id);
    if (response.data.status == 'success') {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
  const addToWishList = async (id) => {
    let { data } = await addProductToWishList(id);
    console.log(data);
    if (data.status == 'success') {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  const removeFromWishList = async (id) => {
    let { data } = await removeProductsFromWishList(id);
    if (data.status == "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }
  function getProducts () {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    .then(({data}) => {
      return data
    })
  }


  useEffect(() => {
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if(isLoading) {
    return <Loader />
  } else {
    return (
      <>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <CategorySlider />
        <div className="home mt-16">
          <div className="container px-4">
            <h1 className="text-xl font-medium text-slate-700">All Products</h1>
            <div className="row gap-2 py-5">
              {data?.data.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="sm:w-[45%] lg:w-[30%] xl:w-[20%] 2xl:w-[20%] px-4 my-2"
                  >
                    <div className="bg-slate-200 p-5">
                      {!flag ? (
                        <span onClick={handleFlag}>
                          <i
                            onClick={() => addToWishList(item.id)}
                            className="fas fa-heart flex justify-end mb-4 cursor-pointer"
                          ></i>
                        </span>
                      ) : (
                        <span onClick={handleFlag}>
                          <i
                            onClick={() => removeFromWishList(item.id)}
                            className="fas fa-heart flex justify-end mb-4 cursor-pointer text-red-500"
                          ></i>
                        </span>
                      )}
                      <Link
                        to={`/productDetails/${item.id}/${item.category.name}`}
                      >
                        <img
                          className="w-full"
                          src={item.imageCover}
                          alt={item.title}
                        />
                        <span className="block text-xl font-light text-green-600">
                          {item.category.name}
                        </span>
                        <span className="text-lg font-semibold text-gray-700">
                          {item.title.split(" ").slice(0, 3).join(" ")}
                        </span>
                        <div className="flex justify-between my-3 items-center">
                          <span>{item.price}EGP</span>
                          <span>
                            {item.ratingsAverage}{" "}
                            <i className="fas fa-star text-yellow-500"></i>
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => addProductItem(item.id)}
                        className="btn"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
