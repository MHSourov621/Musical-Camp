import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import img1 from '../../../assets/banner/banner1.jpg'
import img2 from '../../../assets/banner/banner2.jpg'
import img3 from '../../../assets/banner/banner3.jpg'
import img4 from '../../../assets/banner/banner4.jpg'

const Slider = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img className="w-full h-[800px] rounded-xl" src={img1} alt="" />
                    <div className="absolute h-full rounded-xl flex items-center left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className="text-gray-200 space-y-7 md:w-2/3 pl-20">
                            <h2 className="md:text-6xl md:font-bold">You can try any kinds of musical instruments here.</h2>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide><img className="w-full h-[800px] rounded-xl" src={img2} alt="" />
                    <div className="absolute h-full rounded-xl flex items-center left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className="text-gray-200 space-y-7 md:w-2/3 pl-20">
                            <h2 className="md:text-6xl md:font-bold">You can lear Guitar from our instructors.</h2>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide><img className="w-full h-[800px] rounded-xl" src={img3} alt="" />
                    <div className="absolute h-full rounded-xl flex items-center left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className="text-gray-200 space-y-7 md:w-2/3 pl-20">
                            <h2 className="md:text-6xl md:font-bold">You can try drums set or learn from out instructors.</h2>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide><img className="w-full h-[800px] rounded-xl" src={img4} alt="" />
                    <div className="absolute h-full rounded-xl flex items-center left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className="text-gray-200 space-y-7 md:w-2/3 pl-20">
                            <h2 className="md:text-6xl md:font-bold">You can try riff on guitar or learn from out instructors.</h2>
                        </div>
                    </div>
                </SwiperSlide>
                {/* <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide> */}
            </Swiper>
        </div>
    );
};

export default Slider;