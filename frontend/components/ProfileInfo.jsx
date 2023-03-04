import Link from "next/link";
import { useContext } from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { AppContext } from "../contexts/AppContext";
import ProfilePicture from "./ProfilePicture"

export default function ProfileInfo({ userDetails }) {
    const { 
        notifications,
    } = useContext(AppContext);
    function userNameToUppercase() {
        let restName =  userDetails.name.slice(1);
        let firstLetter = userDetails.name.slice(0, 1).toLocaleUpperCase();
        let fullname  =  firstLetter.concat(restName);
        return fullname;
      }
    return(
        <div className="flex justify-center items-center md:flex-row flex-col md:gap-8 gap-2">
                        <div className="flex justify-center items-center rounded-full border-[5px] border-mainYellow overflow-hidden">  
                            <ProfilePicture />
                        </div>
                        <div className="space-y-3">
                            <div className="w-full">
                                <h1 className="font-bold text-[1.3rem] md:text-left text-center">{ userNameToUppercase() }</h1>
                                <p className="text-[#808080] md:text-left text-center">{ userDetails.bio }</p>
                            </div>
                            <h1 className="text-[#016A95] font-bold text-[1rem] md:text-left text-center"> { notifications.length } Supporters</h1>
                            <div className="flex space-x-4 font-bold">
                                {userDetails.instagram === "" ? (
                                    ''
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <FaInstagram size={20} color="#FF3D00" />
                                        <h2>
                                            <Link target={"_blank"} href={`https://instagram.com/${userDetails.instagram}`}>@{userDetails.instagram}</Link>
                                        </h2>
                                    </div>
                                )}
                                {userDetails.twitter === "" ? (
                                    ""
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <FaTwitter size={20} color="#73CFF4" />
                                        <h2>
                                            <Link target={"_blank"} b href={`https://twitter.com/${userDetails.twitter}`}>@{userDetails.twitter}</Link>
                                        </h2>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
    )
}