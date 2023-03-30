import { FC, useEffect } from "react";
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
import { observer } from "mobx-react-lite";
import { sliderService } from "services/slider";
import { useLanguage } from "context/Translation";
import { Spinner } from "../Spinner";


const Carousel: FC = ({ }) => {
    const { language } = useLanguage();
    const { slides, loading } = sliderService;
    useEffect(() => {
        sliderService.fetchSlides(language)
    }, [language]);
    return <>
        {
            loading ? (
                <Spinner />
            ) : (
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
                            {slides && slides.length ? (
                                slides.map((slide, index) => {
                                    const tit = slide.item.filter(x => x.id == 'title')[0].value[0] as string
                                    const des = slide.item.filter(x => x.id == 'slider_desc')[0].value[0] as string
                                    const link_ = slide.item.filter(x => x.id == 'slider_link')[0].value[0]['url']
                                    const photo_url = slide.item.filter(x => x.id == 'slider_photo')[0].value[0] as string
                                    return (
                                        <SwiperSlide key={index}>
                                            <CarouselSlide title={tit.toUpperCase()} desc={des} link={link_} img={`url(${photo_url})`} />
                                        </SwiperSlide>
                                    )
                                })
                            ) : (
                                <></>
                            )}
                        </Swiper>
                    </div>
                </Container>
            )}

    </>
};

export default observer(Carousel);
