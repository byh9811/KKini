import Slider from "react-slick";

function ImageSlider({ images, height = '400px'}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div className="ImageSliderContainer" style={{ height }}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slider-image-container">
                        <img src={image} alt={`slide-${index}`} className="slider-image" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImageSlider;
