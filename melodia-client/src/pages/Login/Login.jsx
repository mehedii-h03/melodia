import Lottie from "lottie-react";
import login from "../../assets/registered.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null); // State variable for error message
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        setError(null); // Reset error message before login attempt

        loginUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true })
            })
            .catch((error) => {
                console.log("Login error:", error);
                setError("Invalid email or password."); // Set the error message
            });
    };

    const handlerSingUpWithGoogle = () => {
        loginUserWithGoogle()
            .then(result => {
                console.log(result);
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, img: loggedInUser.photoURL }
                fetch('https://melodia-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)

                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully Login with Google',
                            showConfirmButton: false,
                        })
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="lg:px-24 flex flex-col md:flex-row h-[80vh] my-10">
            <div className="md:w-1/2">
                <Lottie className="object-cover w-full h-full" animationData={login} loop={true} />
            </div>
            <div className="flex flex-col items-center justify-center p-8 md:w-1/2">
                <form className="w-3/5" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-semibold mb-14 text-center">Welcome to melodia</h2>
                    <div className="mb-4 mx-auto">
                        <label htmlFor="email" className="block font-semibold mb-2 text-lg">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border-b bg-inherit focus:border-[#525fe1] border-gray-300 focus:outline-none"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block font-semibold mb-2 text-lg">
                            Password
                        </label>
                        <div className="flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="w-full p-2 border-b bg-inherit border-gray-300 focus:outline-none focus:border-[#525fe1] pr-10"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />
                            <button
                                className="absolute right-0 top-0 bottom-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <input
                        type="submit"
                        className="w-full bg-[#525fe1] cursor-pointer text-white py-2 px-2 rounded-md hover:bg-black transition-colors mb-4"
                        value="Sign In"
                    />
                    <p className="text-sm mt-1 text-center">
                        Dont have an Account? <Link to="/registration" className="inline-block align-baseline font-bold text-sm text-[#525fe1] hover:text-[#949dff]">
                            Sign Up
                        </Link>
                    </p>
                    <div className="divider">OR</div>
                    <div className="text-center">
                        <button
                            onClick={handlerSingUpWithGoogle}
                            className="btn btn-sm border-0 bg-inherit hover:bg-base-200"
                            type="button">
                            <FcGoogle />Sign in with google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
