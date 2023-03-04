import { useState } from "react"

export default function PasswordField(props) {
    const [visibility, setVisibility] = useState("show")
    const [type, setType] = useState("password")

    function handleVisibility() {
        if(type === "password") {
            setVisibility('hide')
            setType("text")
        }else{
            setType("password")
            setVisibility("show")
        }
    }
    return(
        <div className="flex flex-col relative mb-6">
            <label className="text-[0.8rem] font-medium" htmlFor="text">{props.label}</label>
            <section className="flex">
                <input className="w-[20rem] h-[3rem] border-mainBlue hover:border-mainBlue rounded-lg apearance-none focus:ring-mainBlue bg-transparent focus:ring-1 focus:border-mainBlue focus:outline-none focus:transition-color" 
                    type={type}
                    value={props.value}
                    id={props.id}
                    placeholder={props.placeholder}
                    onChange={props.onChange} />
                <button className="absolute text-xs right-3 top-[50%]"
                onClick={handleVisibility}>
                    {visibility}
                </button>
            </section>
        </div>
    )
}