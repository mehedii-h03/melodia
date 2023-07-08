import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Slide from "./Slide";
// titles
const subTitle1 = "Discover the Rhythm";
const title1 = "of Melodia";

const subTitle2 = "Explore Your Journey";
const title2 = " with Melodia";

const subTitle3 = "Unleash Your Musical";
const title3 = "with Melodia";

// descriptions
const desc1 = "Unleash Your Musical Journey. Learn, Create, and Grow with our Online Music Education Platform."
const desc2 = "Amplify Your Musical Experience. Embrace Learning, Creation, and Growth with our services."
const desc3 = " Your Ultimate Music School. Learn and Grow with our Platform Online Music Education Learning."

// images 
const img1 = "https://i.ibb.co/6g7jkSh/2.png"
const img2 = "https://i.ibb.co/BZhBkDH/1.png"
const img3 = "https://i.ibb.co/jWd33yD/3.png"

const Banner = () => {

    return (
        <div className="lg:px-24">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide subTitle={subTitle1} title={title1} desc={desc1} img={img1}></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide subTitle={subTitle2} title={title2} desc={desc2} img={img2}></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide subTitle={subTitle3} title={title3} desc={desc3} img={img3}></Slide>
                </SwiperSlide>
            </Swiper>
        </div >

    );
};

export default Banner;