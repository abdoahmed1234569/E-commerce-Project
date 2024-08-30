import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { cartContext } from "../../context/CartContext"
import toast from "react-hot-toast"
import Slider from "react-slick/lib/slider"

export default function ProductDetails() {
  let {AddToCart} = useContext(cartContext)
  let {id} = useParams()
  const [details, setDetails] = useState(null)
  async function addProductItem(id) {
    let response = await AddToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getProductDetails = () => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data}) => {
      console.log(data.data);
      setDetails(data.data)
    })
    .catch()
  }
  useEffect(() => {
    getProductDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <>
      <div className="row justify-center items-center my-8">
        <div className="w-1/4">
          <Slider {...settings}>
            {details?.images.map((item) => {
              return <img key={details?.id} src={item} alt={details?.title} />
            })}
          </Slider>
        </div>
        <div className="w-3/4 flex flex-col justify-around h-80 px-5">
          <div>
            <h1 className="text-3x font-semibold text-slate-800">
              {details?.title}
            </h1>
            <p>{details?.description}</p>
          </div>
          <div>
            <p className="mt-3">{details?.category?.name}</p>
            <div className="flex justify-between my-3 items-center">
              <span>{details?.price}EGP</span>
              <span>
                {details?.ratingsAverage}{" "}
                <i className="fas fa-star text-yellow-500"></i>
              </span>
            </div>
            <button onClick={() => addProductItem(details?.id)} className="btn">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
