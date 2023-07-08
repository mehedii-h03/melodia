import Swal from "sweetalert2";
import useClasses from "../../Hooks/UseClasses";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
    const [selectedClasses, refetch] = useClasses();
    const handlerDelete = id => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://melodia-server.vercel.app/selectClasses/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your toy has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <h1 className='text-4xl text-center mb-10 font-semibold'>Selected Classes</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-300 text-base font-medium">
                        <tr className="">
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Instructor Name</th>
                            <th>Available Seats</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClasses.map((row, index) => <tr key={row._id}>
                            <td>{index + 1}</td>
                            <td className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={row.img} />
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{row.className}</div>
                            </td>
                            <td>{row.price} $</td>
                            <td>
                                <p>{row.instructorName}</p>
                            </td>
                            <td>
                                <p>{row.availableSeats}</p>
                            </td>
                            <td>
                                <Link to={`/dashboard/payment/${row._id}/${row.classId}/${row.price}/${row.className}`} className="btn btn-sm">
                                    Pay
                                </Link>
                                <button onClick={() => handlerDelete(row._id)} className="btn ms-2 btn-sm">Delete</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default SelectedClasses;