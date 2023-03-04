import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ avatar, setAvatar ] = useState("");
    const [ userToken, setUserToken ] = useState("")
    const [ sharePopup, setSharePopup] = useState(false);
    const [ currentPage, setCurrentPage ] = useState("");
    const [ notifications, setNotifications ] = useState([]);
    const [ funderEmailPopup, setFunderEmailPopup ] = useState(false);
    const [ payment, setPayment ] = useState({
        amount: "",
        name: "",
        subaccount: "",
        email: "",
    });

    useEffect(() => {
        const eyes = ["variant01","variant02","variant03","variant04","variant05","variant23","variant12","variant24"];
        const mouth = ["variant01","variant02","variant03","variant04","variant23","variant22","variant12","variant24","variant25","variant16"];
        const eyebrows = ["variant01","variant02","variant03","variant04","variant05","variant6","variant15","variant8"];
        const backgroundColor = ["b6e3f4","c0aede","d1d4f9","ffd5dc","ffdfbf"];

        const randomEyebrows = Math.floor(Math.random() * eyebrows.length);
        const randomEyes = Math.floor(Math.random() * eyes.length);
        const randomMouth = Math.floor(Math.random() * mouth.length);

        const avatars = [
            `https://api.dicebear.com/5.x/adventurer-neutral/svg?eyebrows=${eyebrows[randomEyebrows]}&eyes=${eyes[randomEyes]}&mouth=${mouth[randomMouth]}`,
          ];
    
          const randomIndex = Math.floor(Math.random() * avatars.length);
          const randomAvatar = avatars[randomIndex];
          setAvatar(randomAvatar)
    }, [])

    const [supportDetails, setSupportDetails] = useState({
        name: "",
        text: "",
        profileImg: "",
        amount: "",
        reference: "",
        user_to_id: "",
        user_from_id: ""
    });

    const [ userDetails, setUserDetails ] = useState({
        id: "",
        name: "",
        instagram: "",
        twitter: "",
        website: "",
        supporters: "",
        bio: "",
        email: "",
        profileImg: "",
        bankName: "",
        bankCode: "",
        accountNumber: "",
        accountName: "",
        subaccountCode: ""
    });

    const [ friendDetails, setFriendDetails ] = useState({
        id: "",
        name: "",
        instagram: "",
        twitter: "",
        website: "",
        supporters: "",
        bio: "",
        email: "",
        profileImg: "",
        bankName: "",
        bankCode: "",
        accountNumber: "",
        accountName: "",
        subaccountCode: ""
    });
    
    const [bankInput, setBankInput] = useState("");

    const [bankDetails, setBankDetails] = useState({
        bankCode: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
    });

    // Save user to LocalStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserToken(JSON.parse(localStorage.getItem("userToken")));
        };
    }, [currentPage, supportDetails]);

    const [showPopup, setShowPopup] = useState(false);

    // Signup From state
    const [ registerForm, setRegisterForm ] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [ settingStatus, setSettingStatus ] = useState("editPage");

    let currentPageRoute;

    // get current page name in Localhost
    useEffect(() => {
        if (typeof window !== "undefined") {
            currentPageRoute = JSON.parse(localStorage.getItem('currentPageName'));
            setCurrentPage(currentPageRoute)
        }
    }, [currentPage, setCurrentPage, changeCurrentPageName]);

      // Set current page name in Localhost
    function changeCurrentPageName(pageName) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentPageName', JSON.stringify(pageName))
        }
    }

    const getAllSuppoters = (user_id) => {
        const apiEndPoint = "http://localhost:5000/api/v1/u/get/notifications"
        const details = {
            user_id
        }
        axios.post(apiEndPoint,details)
        .then((response) => {
            setNotifications(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return ( 
        <AppContext.Provider
         value={{
            friendDetails,
            setFriendDetails,
            showPopup,
            setShowPopup,
            settingStatus,
            setSettingStatus,
            changeCurrentPageName,
            currentPage,
            setCurrentPage,
            userToken,
            setUserToken, 
            userDetails,
            setUserDetails,
            setRegisterForm,
            registerForm,
            bankDetails,
            setBankDetails,
            bankInput,
            setBankInput,
            avatar,
            setAvatar,
            payment,
            setPayment,
            funderEmailPopup,
            setFunderEmailPopup,
            supportDetails,
            setSupportDetails,
            notifications,
            setNotifications,
            getAllSuppoters,
            sharePopup,
            setSharePopup
            // profileCartoonAvatar
         }}
        >
            { children }
        </AppContext.Provider>
    )
}