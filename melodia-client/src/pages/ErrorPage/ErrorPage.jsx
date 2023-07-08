
import Lottie from "lottie-react";
import Error from '../../assets/404page.json'
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="text-center">
            <Lottie className="w-1/3 mx-auto" animationData={Error} loop={true} />
            <Link to='/' className="btn btn-wide border-0 bg-[#525fe1] hover:bg-black text-white font-semibold rounded-lg shadow-md">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;