import Banner from "../Banner/Banner";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import PopularClasses from "./PopularClasses/PopularClasses";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularInstructors></PopularInstructors>
            <PopularClasses></PopularClasses>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;