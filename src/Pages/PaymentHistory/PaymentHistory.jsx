import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../component/SectionTitle/SectionTitle";


const PaymentHistory = () => {
    const { data: payment = [] } = useQuery(['payment'], async () => {
        const res = await fetch("http://localhost:5000/payments")
        return res.json();
    })
    return (
        <div className="px-28">
            <div className="mt-14 mb-20">
                <SectionTitle header="Payment History"></SectionTitle>
            </div>
            <table className="table  w-full">
                {/* head */}
                <thead>
                    <tr className='text-blue-600 text-xl'>
                        <th>#</th>
                        <th>TransactionId ID</th>
                        <th>Payment Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payment.map((user, index) => <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.transactionId}</td>
                            <td>$ {user.price}</td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;