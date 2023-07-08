import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const CheckoutForm = ({ id, payingClass, price, name }) => {
    console.log(id);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.post('https://melodia-server.vercel.app/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }


        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            console.log("error", error);
            setCardError(error.message)
        }
        else {
            setCardError('')
            // console.log("payment method", paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            },
        );

        if (confirmError) {
            // setCardError(confirmError.message);
            console.log(confirmError);
        }
        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            const transitionId = paymentIntent.id;
            const payment = {
                email: user.email,
                transactionId: transitionId,
                className: name,
                date: new Date(),
                img: payingClass.img,
                instructorName: payingClass.instructorName,
                price
            }

            const previousEnrolledStudent = payingClass.enrolledStudent;
            const newEnrolledStudent = +previousEnrolledStudent + 1;
            const previousAvailableSeats = payingClass.availableSeats;
            const newAvailableSeats = +previousAvailableSeats - 1;
            console.log('prevenrol: ', previousEnrolledStudent, "newenroll:", newEnrolledStudent);

            // update enroll value
            axios.patch(`https://melodia-server.vercel.app/class/${payingClass._id}`, { enrolledStudent: newEnrolledStudent, availableSeats: newAvailableSeats })
                .then(() => {
                    // 
                })

            // delete form selected classes
            // fetch(`https://melodia-server.vercel.app/selectClasses/${id}`, {
            //     method: "DELETE",
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data);
            //         if (data.deletedCount > 0) {
            //             // console.log('delete successful');
            //         }
            //     })

            // post
            axios.post('https://melodia-server.vercel.app/payments', payment)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Payment Successful',
                            showConfirmButton: false,
                        })
                    }

                })
        }
    }

    return (
        <>
            <form className="w-2/3 m-8 mx-auto text-center" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm mt-10 btn-wide btn-outline" type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className="text-red-400">{cardError}</p>
            }
        </>
    );
};

export default CheckoutForm;