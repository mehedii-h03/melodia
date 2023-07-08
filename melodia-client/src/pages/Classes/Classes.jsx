import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Classes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const { data: classes = [] } = useQuery(["classes"], async () => {
        const res = await fetch("https://melodia-server.vercel.app/classes");
        return res.json();
    });
    const handlerSelect = (singleClass) => {
        const {
            _id,
            img,
            className,
            availableSeats,
            price,
            instructorName,
            instructorEmail,
            enrolledStudent,
        } = singleClass;

        console.log(singleClass.enrolledStudent);

        const userEmail = user?.email;
        if (user && user?.email) {
            const selectClass = {
                classId: _id,
                img,
                className,
                availableSeats,
                price,
                instructorName,
                enrolledStudent,
                instructorEmail,
                email: userEmail,
            };
            fetch("https://melodia-server.vercel.app/selectClasses", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(selectClass),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "You Select This Class",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        } else {
            Swal.fire({
                title: "Please login before selecting class",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now!",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    console.log(classes);

    return (
        <div className="px-4 lg:px-24">
            <h1 className="text-4xl text-center mb-10 font-semibold">Classes </h1>
            <div className="grid grid-cols-3 gap-10 mb-10">
                {classes.map((singleClass) => (
                    <div
                        key={singleClass._id}
                        className={`card card-compact w-96 bg-base-100 shadow-xl ${singleClass.availableSeats === 0 ? "bg-red-500" : ""
                            }`}
                    >
                        <figure>
                            <img className="w-full h-52 object-cover" src={singleClass.img} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{singleClass.className}</h2>
                            <h4 className="text-base">
                                Instructor Name: {singleClass.instructorName}
                            </h4>
                            <h4 className="text-base">
                                Available seats: {singleClass.availableSeats}
                            </h4>
                            <h4 className="text-base">Price: {singleClass.price} $</h4>
                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => handlerSelect(singleClass)}
                                    className="btn bg-[#525fe1] text-white hover:bg-black"
                                    disabled={singleClass.availableSeats === 0}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
