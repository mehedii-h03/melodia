import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const className = form.className.value;
        const img = form.img.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const availableSeats = form.availableSeats.value;
        const price = form.price.value;

        const classData = {
            className,
            img,
            instructorEmail,
            instructorName,
            availableSeats,
            price,
            status: "pending",
            enrolledStudent: 0
        }
        fetch('https://melodia-server.vercel.app/addClass', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(classData)

        })
            .then(res => res.json())
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully added a class',
                    showConfirmButton: false,
                })
            })
        form.reset();
    };
    return (
        <div className="rounded-lg shadow-lg p-8">
            <h1 className="text-4xl text-center mb-20 font-semibold">Add a Class</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/2 md:pr-2">
                        <label htmlFor="className" className="block font-medium mb-2">
                            Class Name
                        </label>
                        <input
                            type="text"
                            name="className"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enter class name"
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                        <label htmlFor="imageUrl" className="block font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="img"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enter image URL"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="instructorName" className="block font-medium mb-2">
                        Instructor Name
                    </label>
                    <input
                        type="text"
                        name="instructorName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enter instructor name"
                        defaultValue={user.displayName}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="instructorEmail" className="block font-medium mb-2">
                        Instructor Email
                    </label>
                    <input
                        type="email"
                        name="instructorEmail"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enter instructor email"
                        defaultValue={user.email}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="availableSeats" className="block font-medium mb-2">
                        Available Seats
                    </label>
                    <input
                        type="number"
                        name="availableSeats"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enter available seats"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enter price"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-wide bg-[#030202] hover:bg-[#241818] text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
