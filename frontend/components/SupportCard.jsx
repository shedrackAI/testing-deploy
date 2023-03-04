import { useContext, useEffect, useState } from "react"
import axios from "axios";

import { AppContext } from "../contexts/AppContext";
import RadioInput from "./RadioInput"
import SecondaryInput from "./SecondaryInput"
import PrimaryButton from "./PrimaryButton"
import Image from "next/image";
import EmailInputpopup from "./EmailInputpopup";

export default function SupportCard({disable}) {
    const { 
        userDetails,
        setUserDetails,
        setFunderEmailPopup,
        funderEmailPopup,
        setSupportDetails,
        supportDetails,
    } = useContext(AppContext);
    
    const [amount, setAmount] = useState(50000);

    const clickPay = (e) => {
        const amountPay = e.target.value * 50000;
        setAmount(amountPay)
        setSupportDetails((prev) => ({
            ...prev,
            token: e.target.value || 1,
        }))
    }

    const sliceAmount = amount.toString().slice(0, -2);
    const decemalAmount = parseInt(sliceAmount).toLocaleString()

    const onchange = (e) => {
        setSupportDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    
    return(
        <section className="w-full flex justify-center">
            {funderEmailPopup && (
                <div>
                    <div className="fixed z-50 top-0 right-0 bottom-0 left-0 flex px-5 justify-center items-center backdrop-blur-sm overflow-y-scroll"
                    onClick={() => setFunderEmailPopup(false)}
                    >
                        <EmailInputpopup amount={amount}/>
                    </div>
                </div>
            )}
            {disable === false ? (

            <div className="max-w-[500px] shadow-xl flex-1 bg-white py-10 sm:py-6 px-3 sm:px-5 rounded-2xl flex flex-col items-center justify-center space-y-7">
                <section className="flex w-full relative flex-col gap-3">
                    <div className="flex w-full items-center bg-[#F4F4F4] rounded-lg">
                        <SecondaryInput
                            type="text"
                            placeholder="Name" 
                            name="name"
                            value={supportDetails.name }
                            onChange={onchange}
                        />
                    </div>
                    <div className="flex w-full items-center bg-[#F4F4F4] rounded-lg">
                        <SecondaryInput
                            type="text"
                            name="text"
                            placeholder="Say something nice (optional)" 
                            value={supportDetails.text}
                            onChange={onchange}
                        />
                    </div>
                </section>
                <div className="flex-1 flex items-center w-full space-x-3 justify-between">
                    <p className="md:text-[1rem] text-[0.6rem] text-[#808080] font-bold max-w-[110px] flex-1">Select token:</p>
                    <RadioInput 
                        value="1"
                        id="token1"
                        for="token1"
                        onClick={clickPay}
                        amount="1"/>
                    <RadioInput
                        value="3"
                        id="token3"
                        for="token3"
                        onClick={clickPay}
                        amount="3"/>
                    <RadioInput
                        value="5"
                        id="token5"
                        for="token5"
                        onClick={clickPay}
                        amount="5"/>
                    <input className="w-12 rounded-lg h-10 text-center apearance-none border-mainBlue border-1 focus:ring-mainYellow bg-transparent focus:ring-1 text-sm focus:border-mainYellow focus:outline-none focus:transition-color" type="text" placeholder="1" />
                </div>
                <PrimaryButton 
                    text={`Support N${decemalAmount}`}
                    onClick={() => {
                        setSupportDetails((prev) => ({
                            ...prev,
                            amount: amount,
                        }));   
                        setFunderEmailPopup(!funderEmailPopup)}
                    } 
                />
            </div>
            ) : (
                <div className="max-w-[500px] shadow-xl flex-1 bg-white opacity-70 py-10 sm:py-6 px-3 sm:px-5 rounded-2xl flex flex-col items-center justify-center space-y-7">
                <section className="flex w-full relative flex-col gap-3">
                    <div className="flex w-full items-center bg-[#F4F4F4] rounded-lg">
                        <SecondaryInput
                            type="text"
                            placeholder="Name" 
                        />
                    </div>
                    <div className="flex w-full items-center bg-[#F4F4F4] rounded-lg">
                        <SecondaryInput
                            type="text"
                            placeholder="Say something nice (optional)" 
                            // name="text"
                            // value={supportDetails.text}
                            // onChange={onchange}
                        />
                    </div>
                </section>
                <div className="flex-1 flex items-center w-full space-x-3 justify-between">
                    <p className="md:text-[1rem] text-[0.6rem] text-[#808080] font-bold max-w-[110px] flex-1">Select token:</p>
                    <RadioInput 
                        // value="1"
                        id="token1"
                        for="token1"
                        // onClick={clickPay}
                        // amount="1"
                    />
                    <RadioInput
                        // value="3" 
                        id="token3"
                        for="token3"
                        // onClick={clickPay}
                        // amount="3"
                    />
                    <RadioInput 
                        // value="5"
                        id="token5"
                        for="token5"
                        // onClick={clickPay}
                        // amount="5"
                    />
                    <input className="w-12 rounded-lg h-10 text-center apearance-none border-mainBlue border-1 focus:ring-mainYellow bg-transparent focus:ring-1 text-sm focus:border-mainYellow focus:outline-none focus:transition-color" type="text" placeholder="1" />
                </div>
                <PrimaryButton 
                    text={`Support N${decemalAmount}`}
                    // onClick={() => {
                    //     setSupportDetails((prev) => ({
                    //         ...prev,
                    //         amount: amount,
                    //     }));   
                    //     setFunderEmailPopup(!funderEmailPopup)}
                    // } 
                />
            </div>
            )}
        </section>
    )
}