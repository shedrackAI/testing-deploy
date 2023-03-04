import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import {TbCurrencyNaira} from 'react-icons/tb'


import { AppContext } from '../contexts/AppContext';
import timesIcon from '../assets/close.svg'
import PrimaryButton from './PrimaryButton';
import PrimaryInput from './PrimaryInput';
import paystack from "../assets/payout.svg"
import axios from 'axios';

function EmailInputpopup({amount}) {
    const { 
        userDetails,
        setFunderEmailPopup,
        funderEmailPopup,
        setSupportDetails,
        supportDetails
    } = useContext(AppContext);

    const [authorizationUrl, setAuthorizationUrl] = useState("");
    const [funderEmail, setFunderEmail] = useState("");

    const onChange = (e) => {
        setFunderEmail(e.target.value)
    }

    const initializePayment = () => {
        const apiEndPoint = "http://localhost:5000/api/v1/u/payment";
        const details = {
            email: funderEmail,
            amount,
            subaccount: userDetails.subaccountCode,
            bearer: "subaccount",
            callback_url: `http://localhost:3000/MyPage`
        }

        axios.post(apiEndPoint,details)
        .then((response) => {
            setAuthorizationUrl(response.data.data.authorization_url);
            setSupportDetails((prev) => ({
                ...prev,
                user_to_id: userDetails.id,
                reference: response.data.data.reference,
            }))
        })
        .catch((error) => {
            toast.error('Something went wrong');
            setFunderEmail("")
            console.log(error)
        })
    }

    useEffect(() => {
        if(funderEmail.includes("@gmail.com")) {
            initializePayment()
        }
    }, [funderEmail]);

    const sliceAmount = amount.toString().slice(0, -2);
    const decemalAmount = parseInt(sliceAmount).toLocaleString()

    const SaveSuppoterDetailsToLocalStorage = () => {
        if(typeof window !== "undefined") {
            localStorage.setItem("supportDetails", JSON.stringify(supportDetails));
        }
        setSupportDetails((prev) => ({
            ...prev,
            name: "",
            text: "",
            amount: "",
            reference: "",
            user_to_id: "",
            user_from_id: ""
        }));
    }

  return (
    <div 
        className="rounded-3xl bg-white w-full max-w-[500px] p-5"
        onClick={e => e.stopPropagation()}
    >
        <nav className='w-full mb-5'>
            <Image
                src={timesIcon}
                alt="close"
                onClick={() => setFunderEmailPopup(!funderEmailPopup)}
                className="cursor-pointer"
            />
        </nav>
        <div className='w-full flex flex-col justify-center items-center mb-5'>
            <h1 className='text-xl'>Support <span className='font-semibold text-2xl'>{userDetails.name}</span></h1>
            <p className='flex text-sm items-center'>You&#39;ll be charged <TbCurrencyNaira size={18}/>{decemalAmount}</p>
        </div>
        <div className='flex flex-col gap-5'>
            <PrimaryInput
                type="text"
                placeholder="Email"
                name="email"
                value={funderEmail}
                onChange={(e) => onChange(e)}
            />
            <Link 
                href={authorizationUrl === "" ? "#" : authorizationUrl} 
                target="_blank" 
                onClick={() => SaveSuppoterDetailsToLocalStorage()}
                className="rounded-full flex justify-center items-center  p-3 w-full bg-mainBlue transition-color ease-in duration-300 mb-4 hover:bg-mainBlue/[80%]"
            >
                {authorizationUrl === "" ? (
                    <div className="lds-ellipsis"><div></div><div></div><div></div></div>
                    ) : (
                    <h1 className='font-bold'>Pay</h1>
                )}
            </Link>
        </div>
        <div className='w-full flex justify-center items-center'>
          <Image
           src={paystack}
           alt="paystack logo"
          />
        </div>
    </div>
  )
}

export default EmailInputpopup