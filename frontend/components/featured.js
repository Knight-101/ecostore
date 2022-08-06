import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import useWindowDimensions from "../utils/getWindowDim";
// import store from "../assets/NFT.jpg";
const store = "../assets/NFT.jpg"

export const DisplayDiv = (props) => {
  return (
    <div className="featured-store">
      <div className="featured-store-image">
        <img
          src={props.image ? props.image : store}
          alt=""
          className="featured-img"
        />
        <div className="store-tags">
          <div className="store-badge">Badge</div>
          <div className="store-badge">Badge</div>
          <div className="store-badge">Badge</div>
        </div>
      </div>
      <div className="featured-store-data">
        <div className="featured-store-name">Name of Store</div>
        <div className="store-merchant">By store owner</div>
        <div className="store-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam ut
          minima quidem ipsam dolores aut culpa sequi voluptatem beatae. Tenetur
          vero soluta facilis unde ducimus beatae deleniti fugit cum
          consequuntur recusandae praesentium inventore voluptatibus
          reprehenderit, eveniet id fugiat, aspernatur assumenda.
        </div>
      </div>
    </div>
  );
};

const Featured = (props) => {
  var s_w = 1000;
  if (typeof window !== "undefined") {
    // Client-side-only code
    const { width } = useWindowDimensions();
    s_w = width;
  }
  function getNumSlides(width) {
    let num = Math.floor(width / 400);
    return num > 0 ? num : 1;
  }

  return (
    <>
      <div className="featured-header">Featured Sellers</div>
      <div className="feature-main">
        <Swiper
          spaceBetween={0}
          slidesPerView={getNumSlides(s_w)}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <DisplayDiv />
          </SwiperSlide>
          <SwiperSlide>
            <DisplayDiv />
          </SwiperSlide>
          <SwiperSlide>
            <DisplayDiv />
          </SwiperSlide>
          <SwiperSlide>
            <DisplayDiv />
          </SwiperSlide>
          <SwiperSlide>
            <DisplayDiv />
          </SwiperSlide>
          <SwiperSlide>
            <DisplayDiv />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Featured;
