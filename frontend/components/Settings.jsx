import React, { useContext, useEffect } from 'react'

import { FaTimes } from 'react-icons/fa'
import { AppContext } from '../contexts/AppContext';
import timesIcon from '../assets/close.svg'
import EditPage from './smallComponents/EditPage'
import Payout from './smallComponents/Payout'
import Image from 'next/image';
import axios from 'axios';

function Settings() {
    const { 
        setShowPopup, 
        showPopup,
        settingStatus,
        setSettingStatus,
        userDetails,
        setUserDetails,
        bankDetails,
        userToken
     } = useContext(AppContext);

     const { 
        website, 
        instagram, 
        twitter, 
        name, 
        bio, 
        profileImg,
        subaccountCode
    } = userDetails;

    const updateProfile = async () => {
        setShowPopup(false)
        const details = {
          website,
          instagram,
          twitter,
          bio,
          profileImg
        }
    
        const apiEndPoint = "http://localhost:5000/api/v1/u/profile/update"
          await axios.post(apiEndPoint, details,  {
              headers: {
                  Authorization: `Bearer ${userToken.accessToken}`
              }
          })
              .then((response) => {
                  console.log(response.data);
              })
              .catch(error => {
                  console.log(error)
              });
    }

    const createSubaccount = async () => {
        setShowPopup(false)
        // Send request to the backend to create a subaccount
        const apiEndPoint = "http://localhost:5000/api/v1/u/payment/create/subAccount";
        const {bankCode, accountNumber, bankName, accountName} = bankDetails;
    
        const details = {
          business_name: userDetails.name,
          bank_code: bankCode,
          account_number: accountNumber,
          percentage_charge: "10",
          primary_contact_email: userDetails.email,
        }
    
        axios.post(apiEndPoint, details)
        .then((response) => { 
          console.log(response.data)
          setUserDetails((prev) => ({
            ...prev,
            subaccountCode: response.data.data.subaccount_code,
          }))
        })
        .catch((error) => {
          console.log(error)
        })

        

        // Send request to the backend to save the user back details
        const apiEndPoint2 = "http://localhost:5000/api/v1/u/profile/update"
        const updateDetails = {
            bankCode,
            bankName,
            accountName,
            subaccountCode,
            accountNumber 
          }
            axios.post(apiEndPoint2, updateDetails,  {
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
    }

    //  useEffect(() => {
    //     console.log(settingStatus)
    //  }, [settingStatus])

  return (
    <div className="w-full mt-20 max-w-[500px] bg-white shadow-md rounded-3xl pb-10">
        <nav className="flex justify-between items-center p-5 border-b-[1px] border-gray/60">
            <div className="flex gap-3 items-center">
                <Image
                 src={timesIcon}
                 alt="close"
                 onClick={() => setShowPopup(!showPopup)}
                 className="cursor-pointer"
                />
                <h1 className="text-sm font-semibold text-lit-gray">Settings</h1>
            </div>
            {settingStatus === "editPage" ? (
                <button onClick={() => updateProfile()} className="px-4 py-1 border bg-mainYellow rounded-full font-bold cursor-pointer">Save</button>
            ) : ""}
            {settingStatus === "editPayout" ? (
                <button onClick={() => createSubaccount()} className="px-4 py-1 border bg-mainYellow rounded-full font-bold cursor-pointer">Save</button>
            ) : ""}
        </nav>
        <ul className="w-full flex px-10 gap-5 font-bold text-sm">
            <li className={settingStatus === "editPage" ? "p-1 border-t-2 text-dark-blue cursor-pointer" : "p-1 text-lit-gray cursor-pointer"} onClick={() => setSettingStatus("editPage")}>Edit page</li>
            <li className={settingStatus === "editPayout" ? "p-1 border-t-2 text-dark-blue cursor-pointer" : "p-1 text-lit-gray cursor-pointer"} onClick={() => setSettingStatus("editPayout")}>Payout</li>
        </ul>

        { settingStatus === "editPayout" ? (  
            <Payout />
        ) : ""}
        { settingStatus === "editPage" ? (  
            <EditPage />
        ) : ""}
        
    </div>
  )
}

export default Settings