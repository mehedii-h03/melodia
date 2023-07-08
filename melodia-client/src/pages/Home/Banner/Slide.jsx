import { useSpring, animated, config } from '@react-spring/web'

const Slide = ({ subTitle, title, desc, img }) => {
    const styles = useSpring({
        from: { opacity: 0, transform: "translateY(8%)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: config.slow,
    });
    return (
        <div>
            <animated.div style={styles}>
                <div className="lg:px-36 px-4 mt-5 md:mt-0 md:mb-10 mb-2 ">
                    <div className="lg:h-[80vh] h-[80vh] mb-0 lg:flex items-center">
                        <div className='md:w-1/2 text-center md:text-left '>
                            <h1 className="lg:text-5xl font-bold text-2xl">
                                {subTitle} <br />
                                <span className="block md:mt-4">{title}</span>
                            </h1>
                            <p className='mt-2 md:mt-5 md:w-5/6 text-lg text-gray-500 '>{desc}</p>
                        </div>
                        <div className='md:w-1/2 mt-3 md:mt-0'>
                            <img src={img} alt="" />
                        </div>
                    </div>
                    <hr />
                </div>
            </animated.div>
        </div >
    );
};

export default Slide;