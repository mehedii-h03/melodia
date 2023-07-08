import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
    // const { user } = useContext(AuthContext)
    // const navigate = useNavigate();

    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/instructors');
        return res.json();
    });

    return (
        <div className="px-4 lg:px-24">
            <h1 className='text-4xl text-center mb-10 font-semibold'>Instructors</h1>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mb-10">
                {instructors.map(instructor => <div
                    key={instructor._id}
                    className="rounded-lg shadow-md w-full flex flex-col lg:flex-row">
                    <div>
                        <img
                            src={instructor.img}
                            className=" pt-4 w-32 h-32 object-contain rounded-sm"
                        />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="font-semibold">Instructor Name:</td>
                                    <td>{instructor.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Instructor Email:</td>
                                    <td>{instructor.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>)}
            </div>
        </div >
    );
};

export default Instructors;