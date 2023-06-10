import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const Checkout = ({ price, id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cartError, setCartError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const token = localStorage.getItem('access-token');

    // useEffect(() => {
    //     if (price > 0) {
    //         axiosSecure.post('/create-payment-intent', { price })
    //             .then(res => {
    //                 console.log(res.data);
    //                 setClientSecret(res.data.clientSecret)
    //             })
    //     }
    // }, [price, axiosSecure])

    useEffect(() => {
        if (price > 0) {
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${token}`
                },
                body: JSON.stringify({ price })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data.clientSecret);
                    setClientSecret(data.clientSecret)
                })
        }
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setCartError(error.message)
        }
        else {
            setCartError('')
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError.message);
        }

        setProcessing(false)
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                data: new Date(),
                status: 'service pending'
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${token}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    fetch(`http://localhost:5000/selectedpatch/${id}`, {
                        method: 'PATCH'
                    })
                        .then(res => res.json())
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment is successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }

    }
    return (
        <div>
            <form className="w-2/3 mx-auto p-24 bg-white rounded-lg text-black" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: 'black',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn bg-blue-700 mb-10 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold mt-8 px-8" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
                {cartError && <p className="text-3xl text-red-600">{cartError}</p>}
                {transactionId && <p className="text-green-500">Transaction Complete whit, Transaction Id : {transactionId}</p>}
            </form>
        </div>
    );
};

export default Checkout;