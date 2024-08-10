import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductGrid from "./ProductGrid";
import { LoadingOutlined } from "@ant-design/icons";

const banner = [
  {
    img: "https://www.snitch.co.in/cdn/shop/files/1722496336-e6c1f96721ead23a_1400x.jpg?v=1722496346",
    link: "",
  },
  {
    img: "https://www.snitch.co.in/cdn/shop/files/WebBanner_1920x1080_2_16120d0d-3483-4a5d-ad39-0c7bcde0ff24_1400x.jpg?v=1722427569",
    link: "",
  },
  {
    img: "https://www.snitch.co.in/cdn/shop/files/WebBanner_1920x1080_4_1400x.jpg?v=1722427569",
    link: "",
  },
];

const collections = [
  {
    img: "https://www.zantum.in/cdn/shop/collections/Shirt-Collection.jpg?v=1717166901&width=600",
    title: "Shirts",
    link: "collections/shirts",
  },
  {
    img: "https://www.zantum.in/cdn/shop/collections/joggers.jpg?v=1717166955&width=600",
    title: "Pants",
    link: "collections/pants",
  },
  {
    img: "https://www.zantum.in/cdn/shop/collections/TShirt-Collection.jpg?v=1719484054&width=600",
    title: "T Shirts",
    link: "collections/t-shirts",
  },
];

const Banner = () => {
  const { data: recent_products, loading } = useFetch({
    url: "/product/get_landing_products",
    method: "GET",
  });

  return (
    <div>
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {banner.map((item) => {
            return (
              <Link key={item.link} to={item.link}>
                <SwiperSlide>
                  <img src={item?.img} alt="" />
                </SwiperSlide>
              </Link>
            );
          })}
        </Swiper>
      </>

      <div style={{ padding: "4rem 2rem 2rem" }}>
        {" "}
        <h3 className="primary_title mb_32">SEASONAL ESSENTIALS</h3>
        <div className="banner_collections">
          {collections.map((item) => {
            return <Collection key={item.title} data={item} />;
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex_center" style={{ minHeight: "30dvh" }}>
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      ) : (
        <>
          <div style={{ padding: "2rem" }}>
            {" "}
            <h3 className="primary_title mb_32">NEW ESSENTIALS</h3>
            <div className="banner_products">
              {loading
                ? ""
                : recent_products?.data?.recent.map((product, i) => (
                    <ProductGrid key={product?.name} product={product} />
                  ))}
            </div>
          </div>

          <div style={{ padding: "2rem" }}>
            {" "}
            <h3 className="primary_title mb_32">SHIRTS</h3>
            <div className="banner_products">
              {loading
                ? ""
                : recent_products?.data?.shirts.map((product, i) => (
                    <ProductGrid key={product?.name} product={product} />
                  ))}
            </div>
          </div>

          <div style={{ padding: "2rem" }}>
            {" "}
            <h3 className="primary_title mb_32">PANTS</h3>
            <div className="banner_products">
              {loading
                ? ""
                : recent_products?.data?.pants.map((product, i) => (
                    <ProductGrid key={product?.name} product={product} />
                  ))}
            </div>
          </div>

          <div style={{ padding: "2rem" }}>
            {" "}
            <h3 className="primary_title mb_32">T SHIRTS</h3>
            <div className="banner_products">
              {loading
                ? ""
                : recent_products?.data?.tshirts.map((product, i) => (
                    <ProductGrid key={product?.name} product={product} />
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;

const Collection = ({ data }) => {
  return (
    <Link className="banner_collection" to={data.link}>
      <img src={data?.img} alt="" />

      <div className="b_c_text">
        <svg
          role="presentation"
          focusable="false"
          width="40"
          height="40"
          class="icon icon-circle-button-right-clipped"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12ZM10.47 9.53 12.94 12l-2.47 2.47 1.06 1.06 3-3 .53-.53-.53-.53-3-3-1.06 1.06Z"
            fill="currentColor"
          ></path>
        </svg>
        <h3>{data.title}</h3>
      </div>
    </Link>
  );
};
