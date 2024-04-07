import React, { useState, useEffect } from "react";
import {
    BsArrowLeftCircleFill,
    BsArrowRightCircleFill
} from "react-icons/bs";
import './Carousell.css'
import img1 from '../assets/images/login-img-1.png';
import img2 from '../assets/images/login-img-2.png';
import img3 from '../assets/images/login-img-3.png';
import img4 from '../assets/images/login-img-4.png';
import img5 from '../assets/images/login-img-5.png';
import img6 from '../assets/images/login-img-6.png';



const data = [
    {
        src: img1,
        alt: "Image 1 for carousel",
    },
    {
        src: img2,
        alt: "Image 2 for carousel",
    },
    {
        src: img3,
        alt: "Image 3 for carousel",
    },
    {
        src: img4,
        alt: "Image 4 for carousel",
    },
    {
        src: img5,
        alt: "Image 5 for carousel",
    },
    {
        src: img6,
        alt: "Image 6 for carousel",
    }
]

const Carousel = () => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    const startAutoplay = () => {
        setAutoplay(true);
    };

    const stopAutoplay = () => {
        setAutoplay(false);
    };

    useEffect(() => {
        let intervalId;

        if (autoplay) {
            intervalId = setInterval(nextSlide, 5000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [slide, autoplay]);

    return (
        <div className="carousel" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
            {data.map((item, idx) => {
                return (<div key={idx} className={slide === idx ? "slide" : "slide slide-hidden"}>
                    <img
                        src={item.src}
                        alt={item.alt}
                        key={idx}
                        className={slide === idx ? "slide" : "slide slide-hidden"}
                    />
                    <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "28px", fontSize: "18px" }}>
                        {item.text}
                    </p>
                </div>

                );
            })}
            <BsArrowRightCircleFill
                onClick={nextSlide}
                className="arrow arrow-right"
            />
            <span className="indicators">
                {data.map((_, idx) => {
                    return (
                        <button
                            key={idx}
                            className={
                                slide === idx ? "indicator" : "indicator indicator-inactive"
                            }
                            onClick={() => setSlide(idx)}
                        ></button>
                    );
                })}
            </span>
        </div>
    );
};
export default Carousel;