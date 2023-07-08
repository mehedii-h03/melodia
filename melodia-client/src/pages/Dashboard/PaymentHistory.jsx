import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const { data: transactions = [] } = useQuery(['transactions'], async () => {
        const res = await fetch(`https://melodia-server.vercel.app/payments?email=${user.email}`);
        return res.json();
    });

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
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((row, index) => <tr key={row._id}>
                            <td>{index + 1}</td>
                            <td className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={row.img} />
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{row.className}</div>
                            </td>
                            <td>{row.instructorName}</td>
                            <td>{row.transactionId}</td>
                            <td>{row.date}</td>

                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default PaymentHistory;