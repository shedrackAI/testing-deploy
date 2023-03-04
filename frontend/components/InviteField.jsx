import { useState } from "react";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function InviteField() {
    const [ email, setEmail ] = useState({email: ""});

    const sendEmail = async () => {
        const apiEndPoint = 'http://localhost:5000/api/v1/u/codegen/signup';
        if (!email.email) return toast.error('Please add your email');
        console.log(email.email)

        await axios.post(apiEndPoint, email)
        .then((response) => {
            console.log(response.data);
            setEmail({email: ""});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <ToastContainer />
            <div className="border-2 hidden sm:block border-mainBlue py-2 pr-2 pl-1 rounded-lg bg-white w-fit">
                <input 
                 className="w-[15rem] apearance-none border-none bg-transparent focus:ring-0" 
                 type="email" 
                 value={email.email}
                 onChange={(e) => setEmail({email: e.target.value})}
                 placeholder="example@email.com" 
                />
                <button onClick={sendEmail} className="bg-mainBlue p-3 rounded-lg">
                    <p className="font-medium text-white">Request Invitation</p>
                </button>
            </div>
            <div className="flex flex-col space-y-3 mt-6 sm:hidden">
                <input 
                 className="w-[20rem] h-[3.5rem] border-dark-blue hover:border-mainBlue rounded-lg apearance-none focus:ring-mainBlue bg-transparent focus:ring-0 focus:border-mainBlue focus:outline-none focus:transition-color"  
                 type="email" 
                 value={email.email}
                 onChange={(e) => setEmail({email: e.target.value})}
                 placeholder="example@email.com" 
                />
                <button onClick={sendEmail} className="bg-mainBlue w-[20rem] py-3 rounded-lg">
                    <p className="font-medium text-white">Request Invitation</p>
                </button>
            </div>
        </>
    )
}