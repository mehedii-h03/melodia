import { useQuery } from "@tanstack/react-query";

const PopularInstructors = () => {
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/popularInstructors');
        return res.json();
    });
    return (
        <div className="my-10 lg:px-24">
            <h2 className="text-center font-semibold mb-10 text-4xl">Popular Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    instructors.map(instructor => <div
                        key={instructor._id}
                        className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img className="h-60 object-cover w-full" src={instructor.img} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{instructor.name}</h2>
                            <p className="text-lg">{instructor.email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;