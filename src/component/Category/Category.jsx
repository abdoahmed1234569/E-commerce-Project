import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
// import Loader from './../Loader/Loader';

export default function Category() {
  const [category, setCategory] = useState([])
  const getCategories = async () => {
    await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({data}) => {
        console.log(data?.data)
        setCategory(data?.data)
      })
      .catch(() => {});
  };
  useEffect(() => {
    getCategories()
  }, []);
  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="categories">
        {category.length ? <div className="container mt-24 px-4">
          <h1 className="text-4xl font-medium text-green-500 text-center p-10">
            All Categories
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 justify-items-center">
            {category.map((item) => {
              return (
                <div
                  key={item._id}
                  className="my-2 text-center border-2 border-[#ccc] rounded"
                >
                  <img src={item.image} className="w-[100%] h-[300px] object-cover object-center aspect-[4/3]" alt={item.name} />
                  <p className="mb-7 mt-7 bg-white text-3xl text-green-500">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div> : <Loader />}
      </div>
    </>
  );
}
