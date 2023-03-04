import Image from "next/image"
import logo from "../assets/logo.png"
import smallLogo from "../assets/smallLogo.svg"
import SecondaryButton from "./SecondaryButton"
import IconButton from "./IconButton"
import { FiShare } from "react-icons/fi";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router"

export default function PageNav() {
    const route = useRouter();
    const { currentPage, setCurrentPage, changeCurrentPageName, setShowPopup, showPopup, setSharePopup } = useContext(AppContext);
    const closeOpenDropdown = () => {
        setShowPopup(!showPopup)
    }

    return(
        <div className="flex items-center justify-between px-2 lg:px-8 mb-10 w-full">
            {/* <div className="w-11 h-11 bg-mainBlue xsm:hidden flex rounded-full mt-3 mb-3"></div> */}
            {currentPage === "login" ? (
                ""
            ) : (
                <div>
                    <Image className="w-48 sm:flex hidden" src={logo} alt="logo" />
                    <Image className="w-11 mt-3 sm:hidden flex" src={smallLogo} alt="Fund-afriend logo" />
                </div>
            )}
            {currentPage === "signup" ? (
                ""
            ) : ""}

                {currentPage === "linkPage" ? (
                    <div className="flex flex-row items-center space-x-3">
                        <IconButton>
                            <FiShare onClick={() => setSharePopup(true)}/>
                        </IconButton>
                        <SecondaryButton
                            text="Create your page"
                            onClick={() => route.push('/')}
                            
                        />
                    </div>
                ):""}
                
                {currentPage === "profile" ? (
                    <div className="flex flex-row items-center space-x-3">
                        <IconButton>
                            <FiShare />
                        </IconButton>
                        <SecondaryButton
                            text="Settings"
                            onClick={closeOpenDropdown}
                        />
                    </div>
                ):""}

                {currentPage === "login" ? (
                    ""
                ):""}

                {currentPage === "signup" ? (
                    ""
                ):""}
        </div>
    )
}