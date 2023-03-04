import token from "../assets/token.png"
import Image from "next/image"

export default function RadioInput(props) {
    return (
        <div className="flex w-full max-w-[80px] flex-1">
            <input onClick={props.onClick} className="peer hidden" type="radio" id={props.id} value={props.value} name="token" />
            <label htmlFor={props.for}
            className="flex w-full xsm:px-3 px-2 xsm:py-2 py-1 items-center justify-center rounded-lg border-2 space-x-1 border-mainYellow hover:bg-[#ffedb3] peer-checked:bg-mainYellow bg-lit-Yellow cursor-pointer transition-color ease-in duration-200">
                <div className="w-6">
                    <Image src={token} alt="token" /> 
                </div>
                <span className="text-sm font-bold">{props.amount}</span>
            </label>
        </div>
    )
}