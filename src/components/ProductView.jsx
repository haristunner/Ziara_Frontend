import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Size from "./Size";
import { Image } from "antd";
import AddToCart from "./AddToCart";
import DescAccordion from "./DescAccordion";
import Quantity from "./Quantity";
import { useState } from "react";

const ProductView = ({ data }) => {
  const [product, setProduct] = useState({
    ...data?.data,
    quantity: 1,
    selected_size: "",
  });

  console.log(product);

  return (
    <>
      {data ? (
        <div className="view_product">
          <div className="image_gallery">
            <>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="product_swiper"
              >
                {data &&
                  data?.data?.images.length &&
                  data?.data?.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <Image src={img} alt="" />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </>
          </div>

          <div className="product_info">
            <p className="product_name">{data?.data?.name}</p>
            <p className="product_price">INR {data?.data?.price}</p>
            <p style={{ fontSize: ".875rem" }}>(incl. of all taxes)</p>

            <Size size={data?.data?.size} data={product} setData={setProduct} />

            <p className="select_size">Quantity</p>
            <Quantity data={product} setData={setProduct} />

            <AddToCart data={product} setData={setProduct} />

            {/* DESCRIPTION */}
            <DescAccordion desc={data?.data?.description} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductView;
