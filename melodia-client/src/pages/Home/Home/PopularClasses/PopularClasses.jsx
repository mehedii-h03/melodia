import { useQuery } from "@tanstack/react-query";

const PopularClasses = () => {
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/popularClasses');
        return res.json();
    });
    return (
        <div className="my-20 lg:px-24">
            <h2 className="text-center font-semibold mb-10 text-4xl">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    classes.map(singleClass => <div
                        key={singleClass._id}
                        className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img className="h-60 object-cover w-full" src={singleClass.img} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Instructor Name: {singleClass.instructorName}</h2>
                            <p className="text-lg">Available Seats: {singleClass.availableSeats}</p>
                            <p className="text-lg">Price: {singleClass.price} $</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;