import Image from "next/image"
import Avatar from "../assets/avatar.png"

export default function Post({name, amount, text, imageUrl, token}) {
    return(
        <div className="flex flex-row space-x-2 items-center  py-3 px-3 w-full bg-white rounded-2xl">
            <div className="full">
                <Image className="w-[60px] " src={imageUrl === "" ? Avatar : imageUrl} alt="Avatar" />
            </div>
            <div className="space-y-2 w-full">
                <h3 className="font-bold text-sm">@{name} <span className="font-normal">bought</span> x{token}</h3>

                <div className="w-full px-3 py-2 bg-mainBlue/30 rounded-md">
                    <p className="font-medium text-sm">{text}</p>
                </div>
            </div>
        </div>
    )
}