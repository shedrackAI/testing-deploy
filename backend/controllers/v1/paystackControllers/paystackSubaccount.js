import axios from "axios";

const createSubAccount = async (req, res) => {
  // Get all the details from the req.body
  const {
    business_name ,
    bank_code,
    account_number,
    percentage_charge,
    primary_contact_email
  } = req.body;

  if (!business_name || !bank_code || !account_number)
    return res.status(404).json("all fields are required");

  // paystack api endpoint to create subaccount
  const apiEndPoint = "https://api.paystack.co/subaccount";

  // paystack api requirement
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/subaccount",
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        process.env.PAYSTACK_TEST_SECRET_KEY ||
        process.env.PAYSTACK_LIVE_SECRET_KEY
      }`,
      "Content-Type": "application/json"
    }
  };

  // User account details
  const accountDetails = JSON.stringify({
    business_name,
    bank_code,
    account_number,
    percentage_charge,
    primary_contact_email
  });

  // Sending post request to the paystack create subaccount endpoint
  await axios
    .post(apiEndPoint, accountDetails, options)
    .then(async (response) => {
      res.status(201).json({
        status: true,
        message: "account has been created",
        data: response.data.data
      });
    })
    .catch((error) => {
      // Sending any error back to the frontend
      res.status(400).json({ error });
    });
};

// ===== == === ====================================
// ===== === == ============= NEXT FUNCTION ========
// ===== ==== = ====================================

const getAllSubAccouts = async (req, res) => {
  // paystack api endpoint to get all subaccounts
  const apiEndPoint = `https://api.paystack.co/subaccount`;

  // paystack api requirement
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/subaccount",
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        process.env.PAYSTACK_TEST_SECRET_KEY ||
        process.env.PAYSTACK_LIVE_SECRET_KEY
      }`,
      "Content-Type": "application/json"
    }
  };

  // Sending get request to the paystack list subaccount endpoint
  await axios
    .get(apiEndPoint, options)
    .then((response) => {
      // Sending the result to the frontend
      res.status(200).json({
        status: true,
        message: "all subaccount gotten",
        data: response.data.data
      });
    })
    .catch((error) => {
      // Sending any error back to the frontend
      res.status(400).json({
        status: false,
        message: "an error occure while getting all the subaccounts",
        data: error
      });
    });
};

// ===== == === ====================================
// ===== === == ============= NEXT FUNCTION ========
// ===== ==== = ====================================

const getSingleSubaccount = async (req, res) => {
  const id_or_code = req.params.id_or_code;

  // paystack api endpoint to update a single subaccounts
  const apiEndPoint = `https://api.paystack.co/subaccount/${id_or_code}`;

  // paystack api requirement
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/subaccount/:id_or_code",
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        process.env.PAYSTACK_TEST_SECRET_KEY ||
        process.env.PAYSTACK_LIVE_SECRET_KEY
      }`,
      "Content-Type": "application/json"
    }
  };

  // Sending gey request to the paystack to get a single subaccount endpoint
  await axios
    .get(apiEndPoint, options)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Subaccount retrieved",
        data: response.data.data
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        message: "Could not get subaccount",
        data: error
      });
    });
};

// ===== == === ====================================
// ===== === == ============= NEXT FUNCTION ========
// ===== ==== = ====================================

const updateSubaccount = async (req, res) => {
  const id_or_code = req.params.id_or_code;
  let { business_name, settlement_bank, account_number } = req.body;

  // // Check if the account already exist in the database
  // const accountExist = await SubAccount.findById({user: user.id});

  // // Check if the account already exist in the database
  // if (!accountExist) return res.status(400).json("This account does not exist");

  // paystack api endpoint to update a single subaccounts
  const apiEndPoint = `Bearer ${
    process.env.PAYSTACK_TEST_SECRET_KEY || process.env.PAYSTACK_LIVE_SECRET_KEY
  }`;

  // paystack api requirement
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/subaccount/:id_or_code",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
      "Content-Type": "application/json"
    }
  };

  const paramss = JSON.stringify({
    primary_contact_email: "dafe@aba.com",
    percentage_charge: 18.9,
    business_name: "victor aigbe",
    bank_code: "092",
    account_number: "2208797687"
  });

  // Sending put request to the paystack update subaccount endpoint
  await axios
    .put(apiEndPoint, paramss, options)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Subaccount updated",
        data: response.data.data
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        message: "Could no update subaccount",
        data: error
      });
    });
};

export {
  createSubAccount,
  getAllSubAccouts,
  updateSubaccount,
  getSingleSubaccount
};