import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const MyClass = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch(`https://melodia-server.vercel.app/myClasses/${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    console.log(classes);
    return (
        <div>
            <h1 className='text-4xl text-center mb-10 font-semibold'>My Classes </h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-300 text-base font-medium">
                        <tr className="">
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((row, index) => <tr key={row._id}>
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
                                <p className="uppercase">{row.status}</p>
                            </td>
                            <td>
                            <p>{row.enrolledStudent}</p>
                            </td>
                            <td>
                                <p>Nothing</p>
                            </td>
                            <td>
                                <button className="btn btn-sm">Update</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyClass;