import axios from "axios"
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function Brands() {
  const [brand, setBrands] = useState([])
  // const [isLoading, setLoading] = useState(true)
  const getBrands = async () => {
     await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
     .then(({data}) => {
      console.log(data?.data);
      setBrands(data?.data)
     })
     .catch()
  }
  useEffect(() => {
    getBrands()
  }, [])
  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="brands">
        {brand.length > 0 ? <div className="container mt-24 px-4">
          <h1 className="text-4xl font-medium text-green-500 text-center p-10">
            All Brands
          </h1>
          <div className="grid grid-cols-4 gap-x-4 gap-y-4 justify-items-center">
            {brand.map((item) => {
              return (
                <div
                  key={item._id}
                  className="px-4 my-2 text-center border-2 border-[#ccc] rounded"
                >
                  <img src={item.image} alt={item.name} />
                  <p className="mb-7">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div> : <Loader />}
      </div>
    </>
  );
}
