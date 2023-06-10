import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_payment_getway_pk);
    // console.log(import.meta.env.VITE_payment_getway_pk);
    const { id } = useParams();
    const { data: course = [],} = useQuery(['course'], async () => {
        const res = await fetch(`http://localhost:5000/select/${id}`)
        return res.json();
    })
    // console.log(course.price);
    return (
        <div>
            <div className="mt-14 mb-28">
                <SectionTitle header="Payment"></SectionTitle>
            </div>
            <Elements stripe={stripePromise}>
                <Checkout id={course._id} price={course?.price}></Checkout>
            </Elements>
        </div>
    );
};

export default Payment;