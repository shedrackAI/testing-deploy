import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PrimaryInput from '../PrimaryInput'
import paystack from "../../assets/payout.svg"
import axios from 'axios'
import { AppContext } from '../../contexts/AppContext'

function Payout() {
  const { 
    userDetails,
    setUserDetails,
    bankDetails,
    setBankDetails,
    bankInput,
    setBankInput,
    setSettingStatus,
    funderEmailPopup,
    setFunderEmailPopup
} = useContext(AppContext);

  const [bank, setBank] = useState([]);
  const [filteredData, setFilteredData] = useState(bank);
  const [bankDropDown, setBankDropDown] = useState(false);
 
  const getListOfBank = async () => {
    setBankDropDown(true)
    const apiEndPoint = "http://localhost:5000/api/v1/u/payment/getbankList";

    await axios.get(apiEndPoint)
    .then((response) => { 
      setFilteredData(response.data.data);
      setBank(response.data.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    const validateAccount = async () => {
      if (bankDetails.accountNumber.length >= 10 ) {
        const {bankCode, accountNumber} = bankDetails;
        const details = {
          bank_code: bankCode,
          account_number: accountNumber
        }

        const apiEndPoint = `http://localhost:5000/api/v1/u/payment/validate`;
  
        await axios.post(apiEndPoint, details)
        .then((response) => { 
          setBankDetails((prev) => ({
            ...prev,
            accountName: response.data.data.account_name,
          }));
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }

    validateAccount()
  }, [bankDetails.accountNumber])

  const handleSearch = (event) => {
    let value = event.target.value;
    setBankInput (event.target.value)
    let result = [];
    result = bank.filter((data) => {
    return data.slug.search(value) != -1;
    });
    setFilteredData(result);
  };

  const clickOnBanks = (e) => {
    setBankInput(e.currentTarget.innerText);
    setBankDropDown(false)
  }

  return (
    <section>
        <form className="my-5 space-y-5 px-10">
            <div className="space-y-1 relative z-50">
                <label htmlFor="bankCode" className="font-bold text-sm">Bank Code</label>
                <PrimaryInput 
                  type="text"
                  placeholder="Select Bank"
                  name="bankName"
                  value={bankInput}
                  onFocus={() => getListOfBank()}
                  onChange={(event) => handleSearch(event)}
                />
                {bankDropDown && (
                  <div className='max-h-[200px] w-full overflow-y-scroll absolute z-50 bg-white shadow-md rounded-lg'>
                      {filteredData.map((value, index) => (
                        // return? (
                          <div 
                           key={value.id} 
                           onClick={(e) => {
                            clickOnBanks(e)
                            setBankDetails((prev) => ({...prev,bankCode: value.code,bankName: value.slug}));
                          }} 
                           className="py-2 hover:bg-gray/10 p-5">
                            {value.name} - <span>({value.code})</span>
                          </div>
                        // )
                      ))}
                  </div>
                )}
            </div>
            <div className="space-y-1">
                <label htmlFor="accountNumber" className="font-bold text-sm">Account number</label>
                <PrimaryInput 
                  type="text"
                  id="accountNumber"
                  placeholder="Account number"
                  name="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails((prev) => ({...prev,accountNumber: e.target.value}))}
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="accountName" className="font-bold text-sm">Account name</label>
                <PrimaryInput 
                  type="text"
                  id="accountName"
                  placeholder="Account name"
                  value={bankDetails.accountName}
                  name="accountName"
                />
            </div>
        </form>
        <p className='px-10 text-lit-gray '>
            Payout is instant! add your bank account details and
            receive payments straight to your bank account
        </p>
        <div className='w-full flex justify-center items-center mt-5'>
          <Image
           src={paystack}
           alt="paystack logo"
          />
        </div>
    </section>
  )
}

export default Payout