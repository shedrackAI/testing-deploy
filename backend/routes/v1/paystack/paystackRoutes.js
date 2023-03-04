import express from "express";
import { initializePayment, validateAccountNumber, verifyPayment } from "../../../controllers/v1/paystackControllers/paystackPayment.js";
import { getlistOfBanks } from "../../../controllers/v1/paystackControllers/paystackUtilsControllers.js";
import {
  createSubAccount,
  getAllSubAccouts,
  getSingleSubaccount,
  updateSubaccount
} from "../../../controllers/v1/paystackControllers/paystackSubaccount.js";
const router = express.Router();

/**
 * @description create's subAccount for users
 * @route POST api/v1/u/payment/create/subAccount
 * @access public
 */
router.post("/create/subAccount", createSubAccount);

/**
 * @description get all subAccounts
 * @route GET api/v1/u/payment/subAccount/all
 * @access public
 */
router.get("/subAccount/all", getAllSubAccouts);

/**
 * @description get a single subAccounts
 * @route GET api/v1/u/payment/subAccount/:id_or_code
 * @access public
 */
router.get("/subAccount/:id_or_code", getSingleSubaccount);

/**
 * @description get all subAccounts
 * @route PUT api/v1/u/payment/subAccount/update/:id
 * @access public
 */
router.put("/subAccount/update/:id_or_code", updateSubaccount);

// ===== == === ====================================
// ===== === == ======== NEXT ROUTE PAYMENT ========
// ===== ==== = ====================================

/**
 * @description users can fund
 * @route POST api/v1/u/payment
 * @access public
 */
router.post("/", initializePayment);

/**
 * @description users can fund
 * @route POST api/v1/u/payment/getbankList
 * @access public
 */
router.get("/getbankList", getlistOfBanks);

/**
 * @description users can fund
 * @route POST api/v1/u/payment/validate
 * @access public
 */
router.post("/validate", validateAccountNumber);

/**
 * @description verify payment
 * @route POST api/v1/u/payment/verify
 * @access public
 */
router.post("/verify", verifyPayment);

export default router;  