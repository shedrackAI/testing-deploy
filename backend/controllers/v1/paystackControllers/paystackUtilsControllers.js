import axios from "axios";

const getlistOfBanks = async (req, res) => {
    const apiEndPoint = "https://api.paystack.co/bank";

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/bank',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY || process.env.PAYSTACK_LIVE_SECRET_KEY}`
        }
    }

    await axios.get(apiEndPoint, options)
    .then((response) => {
        res.status(200).json({
            status: true,
            message: "Banks retrieved",
            data: response.data.data
        })
    })
    .catch((error) => {
        res.status(200).json({
            status: false,
            message: "could not get list of banks",
            data: error
        })
    })
}

export {
    getlistOfBanks
}