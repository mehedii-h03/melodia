import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    const { id, classId, price, name } = useParams();
    console.log(id);
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch('https://melodia-server.vercel.app/classes');
        return res.json();
    });

    const payingClass = classes.find(singleClass => singleClass._id === classId);
    
    return (
        <div>
            <h1 className='text-4xl text-center mb-10 font-semibold'>Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm payingClass={payingClass} selectedClassId={id} price={price} name={name}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;