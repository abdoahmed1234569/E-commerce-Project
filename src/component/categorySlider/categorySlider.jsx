import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick/lib/slider";
import img1 from "../../assets/slider-image-1.jpeg"
import img2 from "../../assets/slider-image-2.jpeg"
import banner from "../../assets/grocery-banner.png"
import banner2 from "../../assets/grocery-banner-2.jpeg"

export default function CategorySlider() {
  const [category, setCategories] = useState([]);
  const getCategories = async () => {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch();
  };

  useEffect(() => {
    getCategories();
  }, []);

   let settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 6,
     slidesToScroll: 1,
   };
   let settings2 = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false
   };
  return (
    <div className="py-20 px-4 overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="w-1/3">
            <img src={img1} alt="img1" className="w-full secondImg" />
            <img src={img2} alt="img2" className="w-full secondImg" />
          </div>
          <div className="w-2/3">
            <Slider {...settings2}>
              <img src={banner} alt="......" className="w-full mainImg" />
              <img src={banner2} alt="......" className="w-full mainImg" />
            </Slider>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-medium text-slate-700 my-4">
        Shop Popular Category
      </h1>
      <Slider {...settings}>
        {category.map((item) => {
          return (
            <img
              key={item.id}
              className="image"
              src={item.image}
              alt={item.name}
            />
          );
        })}
      </Slider>
    </div>
  );
}
