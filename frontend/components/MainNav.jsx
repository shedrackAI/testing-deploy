import Link from "next/link"
import Image from "next/image"
import SecondaryButton from "./SecondaryButton"
import Logo from "../assets/logo.png"
import smallLogo from "../assets/smallLogo.svg"

export default function MainNav() {
    return (
        <div className="flex flex-row w-[100%] justify-between items-center">
            <Link href="/">
                <Image className="w-48 xsm:flex hidden" src={Logo} alt="Fund-afriend logo" />
                <Image className="w-14 m-3 xsm:hidden flex" src={smallLogo} alt="Fund-afriend logo" />
            </Link>
            <Link href="/login" className="pr-3">
                <SecondaryButton text="Log In" />
            </Link>
        </div>
    )
}