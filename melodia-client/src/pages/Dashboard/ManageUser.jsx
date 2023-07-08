import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUser = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/users')
        return res.json();
    })

    // admin handler
    const handlerMakeAdmin = row => {
        fetch(`https://melodia-server.vercel.app/users/admin/${row._id}`, {
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
                        title: ` ${row.name} is Admin From Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
    }

    // instructor handler
    const handlerMakeInstructor = user => {
        fetch(`https://melodia-server.vercel.app/users/instructor/${user._id}`, {
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
                        title: `${user.name} is Instructor From Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
    }

    return (
        <div>
            <h1 className='text-4xl text-center mb-10 font-semibold'>Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-300 text-base font-medium">
                        <tr className="">
                            <th>#</th>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>User email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((row, index) => <tr key={row._id}>
                            <td>{index + 1}</td>
                            <td className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={row.img} />
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{row.name}</div>
                            </td>
                            <td>{row.email}</td>
                            <td>
                                <button
                                    disabled={row.role === 'instructor'}
                                    onClick={() => handlerMakeInstructor(row)}
                                    className="btn btn-sm me-2">Make Instructor</button>
                                <button
                                    disabled={row.role === 'admin'}
                                    onClick={() => handlerMakeAdmin(row)}
                                    className="btn btn-sm">Make Admin</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageUser;