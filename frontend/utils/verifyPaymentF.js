import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";



let funderDetails;
const addSupport = (userDetails) => {
    // const [validReference, setValidReference] = useState("");
    // const [funderDetails, setFunderDetails] = useState({});


    const apiEndPoint = "http://localhost:5000/api/v1/u/friend/support"
    const details = {
        from: funderDetails.name, 
        to: userDetails.name,
        message: funderDetails.text,
        reference: funderDetails.reference,
        token: funderDetails.token, 
        amount: funderDetails.amount,
        user_id: userDetails.id,
        profileImg: "",
    }
    axios.post(apiEndPoint,details)
    .then((response) => {
        console.log(response); 
        if(typeof window !== "undefined") {
            localStorage.removeItem("supportDetails")
        }
        funderDetails = ""
    })
    .catch((error) => {
        console.log(error)
    })
}


const verifyPayment = async (userDetails) => {
    // const [validReference, setValidReference] = useState("");
    let validReference;

    if(typeof window !== "undefined") {
        funderDetails = JSON.parse(localStorage.getItem('supportDetails'));
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('reference')) {
            validReference = urlParams.get('reference');
                if (validReference !== "") {

                    const apiEndPoint = "http://localhost:5000/api/v1/u/payment/verify" 
                    const details = {
                        reference: validReference, 
                    }
                    await axios.post(apiEndPoint,details) 
                    .then((response) => {
                        addSupport(userDetails);
                        window.location.reload();
                    }) 
                    .catch((error) => { 
                        console.log(error)
                    })
                }
        }
    }
}


export {
    verifyPayment,
    addSupport
}