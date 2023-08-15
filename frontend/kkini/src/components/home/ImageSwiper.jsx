import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

function ImageSwiper({ postImage }) {
  return (
    <Swiper
      pagination={true}
      className="mySwiper"
      style={{ width: "100%", height: "100%" }}
    >
      {postImage.map((link, index) => (
        <SwiperSlide key={index} style={{ alignItems: "center" }}>
          <img src={link} alt={`Image ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSwiper;
