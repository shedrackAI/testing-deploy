import axios from "axios";

const validateAccountNumber = async (req, res) => {
    // geting user details from req query
    const {account_number, bank_code} = req.body;

    // paystack api endpoint to resolve account number
    const apiEndPoint = `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY || process.env.PAYSTACK_LIVE_SECRET_KEY}`
        }
      }

    await axios.get(apiEndPoint, options)
    .then((response) => {
        res.status(200).json({
            status: true,
            message: "Account number resolved",
            data: response.data.data
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: false,
            message: "could not resolve account number",
            data: error
        })
    })

}


const verifyPayment = async (req, res) => {
    // geting user details from req query
    const {reference} = req.body;

    // paystack api endpoint to resolve account number
    const apiEndPoint = `https://api.paystack.co/transaction/verify/${reference}`;

    const options = {
        hostname: 'api.paystack.co',
        port: 443, 
        path: '/transaction/verify/:reference',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY || process.env.PAYSTACK_LIVE_SECRET_KEY}`
        }
    }

    await axios.get(apiEndPoint, options)
    .then((response) => {
        res.status(200).json({
            status: true,
            message: "Verification successful",
            data: response.data.data
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: false,
            message: "could not verify payment",
            data: error
        })
    })

}



const initializePayment = async (req, res) => {
    const { email, amount, subaccount, bearer, callback_url } = req.body;

    const apiEndPoint = "https://api.paystack.co/transaction/initialize";

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY || process.env.PAYSTACK_LIVE_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
    }

    const paymentDetails = JSON.stringify({
      email,
      amount,
      subaccount,
      bearer,
      callback_url
    });

    await axios.post(apiEndPoint,paymentDetails, options)
    .then((response) => {
        res.status(200).json({
            status: true,
            message: "Authorization URL created",
            data: response.data.data
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: false,
            message: "could not initialize your transaction",
            data: error
        })
    })

}

export {
    initializePayment,
    validateAccountNumber,
    verifyPayment
}