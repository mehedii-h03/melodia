import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    const { data: reviews = [] } = useQuery(['users'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/reviews');
        return res.json();
    });

    return (
        <div className="my-20 px-4 lg:px-24">
            <h2 className="text-4xl text-center font-semibold mb-10">Testimonial</h2>
            <Slider {...settings}>
                {reviews.map((review) => (
                    <div key={review._id} className="rounded-lg shadow-lg px-10 py-5 h-96 md:py-10 md:px-20 ">
                        <div className='md:flex items-center'>
                            <div className="mr-4">
                                <img src={review.img} alt="" className="rounded-full w-20 h-20 md:w-60 object-cover md:h-60" />
                            </div>
                            <div>
                                <h3 className="text-2xl mb-4 font-medium">{review.name}</h3>
                                <Rating style={{ maxWidth: 80 }} value={review.rating} readOnly />
                                <p className="mt-4">{review.details}</p>

                            </div>
                        </div>
                    </div>

                ))}
            </Slider>
        </div>
    );
};

export default Testimonial;
