import { FC } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import backImage from 'assets/image/slideImage.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.styles.css";

// import required modules
import { Keyboard, Pagination } from "swiper";
import { CarouselSlide } from "./CarouselSlide";
import { Container } from "../Container";


const Carousel: FC = ({ }) => {
    return (
        <Container>
            <div id="home-carousel">
                <div className='carousel__Head'>
                    <div className='carousel__Head__text'>
                        {'информационный портала о проектах и продуктах в сфере искусственного интеллекта'.toUpperCase()}
                    </div>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    keyboard={{
                        enabled: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Keyboard, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide><CarouselSlide title={'международный форум “ этика искусственного интеллекта”'.toUpperCase()}
                     desc={'Создание умного «помощника», способного выполнять различные задачи, – основной вектор при разработке любого ИИ. Уже сейчас интеллектуальные системы внедрены во многие сферы жизни. На их основе подбираются рекомендации в сети, благодаря им вы можете в любой момент поговорить с «Алисой» или «Siri».'}
                     link={'/'} img={`url(${backImage})`}/></SwiperSlide>
                    <SwiperSlide><CarouselSlide title={'международный форум “ этика искусственного интеллекта”'.toUpperCase()}
                     desc={'Создание умного «помощника», способного выполнять различные задачи, – основной вектор при разработке любого ИИ. Уже сейчас интеллектуальные системы внедрены во многие сферы жизни. На их основе подбираются рекомендации в сети, благодаря им вы можете в любой момент поговорить с «Алисой» или «Siri».'}
                     link={'/'} img={`url(${backImage})`}/></SwiperSlide>
                    <SwiperSlide><CarouselSlide title={'международный форум “ этика искусственного интеллекта”'.toUpperCase()}
                     desc={'Создание умного «помощника», способного выполнять различные задачи, – основной вектор при разработке любого ИИ. Уже сейчас интеллектуальные системы внедрены во многие сферы жизни. На их основе подбираются рекомендации в сети, благодаря им вы можете в любой момент поговорить с «Алисой» или «Siri».'}
                     link={'/'} img={`url(${backImage})`}/></SwiperSlide>
                </Swiper>
            </div>
        </Container>
    );
};

export default Carousel;
