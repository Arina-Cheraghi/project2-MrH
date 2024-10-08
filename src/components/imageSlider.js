// ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import slide1 from "../assets/img/slide1.webp";
import slide2 from "../assets/img/slide2.webp";
import slide3 from "../assets/img/slide3.webp";
import '../assets/css/ImageSlider.css';



const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 2000, 
        arrows: false, 
    };

    return (
        
           <div className='slider' style={{ position: 'relative' }}>
             <Slider {...settings}>
                <div>
                    <img src={slide1} alt="Image 1" style={{ width: '100%' }} />
                </div>
                <div>
                    <img src={slide2} alt="Image 2" style={{ width: '100%' }} />
                </div>
                <div>
                    <img src={slide3} alt="Image 3" style={{ width: '100%' }} />
                </div>
            </Slider>
           </div>
    );
};

export default ImageSlider;
