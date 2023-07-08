import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const { data: classes = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/allClasses')
        return res.json();
    })

    // handler approve
    const handlerApprove = id => {
        fetch(`https://melodia-server.vercel.app/class/approved/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Approved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
    }

    // handlerDeny
    const handlerDeny = id => {
        fetch(`https://melodia-server.vercel.app/class/denied/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Denied',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
    }

    return (
        <div>
            <h1 className='text-4xl text-center mb-10 font-semibold'>Manage Classes</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-300 text-base font-medium">
                        <tr className="">
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((row, index) => <tr key={row._id}>
                            <td>{index + 1}</td>
                            <td className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={row.img} />
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{row.class}</div>
                            </td>
                            <td>{row.instructorName}</td>
                            <td>{row.instructorEmail}</td>
                            <td>{row.availableSeats}</td>
                            <td>{row.price} $</td>
                            <td className="flex gap-1">
                                <button
                                    disabled={row.status !== 'pending'}
                                    onClick={() => handlerApprove(row._id)}
                                    className="btn btn-sm me-1">Approved</button>
                                <button
                                    disabled={row.status !== 'pending'}
                                    onClick={() => handlerDeny(row._id)}
                                    className="btn btn-sm me-1">Deny</button>
                                <button
                                    // disabled={row.status === 'admin'}
                                    // onClick={() => handlerMakeAdmin(row)}
                                    className="btn btn-sm">Feedback</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageClasses;