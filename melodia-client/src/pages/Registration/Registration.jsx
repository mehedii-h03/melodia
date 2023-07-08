import { Link, useNavigate } from "react-router-dom";
import animation from "../../assets/Ani_0020.json";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const Registration = () => {
    const { createUser, loginUserWithGoogle, profilePicUpdate } = useContext(AuthContext);
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const handleTogglePassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = e => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    const password = watch('password');

    const onSubmit = async (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)

                // update profile pic
                profilePicUpdate(user, {
                    displayName: data.name, photoURL: data.photo
                })
                    .then(() => {
                        //photo updated
                    })

                const saveUser = { name: data.name, email: data.email, img: data.photo }
                console.log(saveUser);
                fetch('https://melodia-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully Account Created',
                                showConfirmButton: false,
                            })
                        }
                    })
                navigate("/");
            })
            .catch(error => {
                console.log("Registration error:", error);
            })
    };

    // google sign in
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
                        navigate('/')
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex mb-8 shadow-xl lg:w-3/4 mx-auto mt-3 rounded-lg">
            <div className="hidden rounded-lg md:flex md:flex-col md:justify-center md:items-center md:w-1/2 md:relative md:bg-cover md:bg-center">
                <Lottie className="w-44 md:w-2/4" animationData={animation} loop={true} />
                <h2 className="text-4xl font-bold text-center">Welcome to Melodia!</h2>
                <p className='mt-2'>Be the signer with melodia </p>
            </div>
            {/* Left side with form */}
            <div className="flex flex-col justify-center items-center py-4 px-6 lg:px-0 w-full md:w-1/2 border-l border-gray-300">
                <h1 className="text-3xl font-bold mt-3 mb-8">Sign Up</h1>
                <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register('name', { required: true })}
                            className="border-b bg-inherit border-gray-300 w-full py-2 px-3 leading-tight focus:outline-none focus:border-[#525fe1]"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-sm text-red-600">Name is required</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                            className="border-b bg-inherit border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#525fe1]"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-sm mt-1 text-red-600">Email is required</p>}
                        {errors.email && errors.email.type === "pattern" && (
                            <p className="text-sm mt-1 text-red-600">Please enter a valid email address</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="photo">
                            Photo Url
                        </label>
                        <input
                            {...register('photo')}
                            className="border-b bg-inherit border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#525fe1]"
                            id="photo"
                            type="text"
                            placeholder="Enter your photo url"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex">
                            <input
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*?[A-Z])(?=.*?[!@#$%^&*]).{6,}$/
                                })}
                                className="border-b bg-inherit border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#525fe1] pr-10"
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                            />
                            <button
                                className="absolute right-0 top-0 bottom-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && errors.password.type === "required" && (
                            <p className="text-red-500 mt-1 text-sm">Password is required.</p>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <p className="text-red-500 mt-1 text-sm">
                                Password must be at least 6 characters long.
                            </p>
                        )}
                        {errors.password && errors.password.type === "pattern" && (
                            <p className="text-red-500 mt-1 text-sm">
                                Password must contain at least one capital letter, one special character.
                            </p>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <label className="block font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="flex">
                            <input
                                {...register('confirmPassword', {
                                    required: true,
                                    validate: value => value === password
                                })}
                                className="border-b bg-inherit border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#525fe1] pr-10"
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm password"
                            />
                            <button
                                className="absolute right-0 top-0 bottom-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                onClick={handleToggleConfirmPassword}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                            <p className="text-red-500 mt-1 text-sm">Confirm Password is required.</p>
                        )}
                        {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                            <p className="text-red-500 mt-1 text-sm">Passwords do not match.</p>
                        )}
                    </div>
                    <input
                        className="btn btn-sm bg-[#525fe1] text-white hover:bg-black border-0"
                        type="submit"
                        value='Sign Up'
                    />
                    <p className='mt-4 text-sm text-red-600'>{/* {error} */}</p>
                    <p className='text-sm mt-1 text-center'>
                        Already have an Account?{' '}
                        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-[#525fe1] hover:text-[#949dff]">
                            Log in
                        </Link>
                    </p>
                    <div className="divider">OR</div>
                </form>
                <div className="text-center mt-2">
                    <button
                        onClick={handlerSingUpWithGoogle}
                        className="btn btn-sm border-0 bg-inherit hover:bg-base-200"
                        type="button"
                    >
                        <FcGoogle className=''></FcGoogle>Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
