// const express = require("express");
// const {
//   processPayment,
//   getPaymentStatus,
//   sendStripeApiKey,
// } = require("../controllers/paymentController");
// const { isAuthenticatedUser } = require("../middlewares/auth");

// const router = express.Router();

// router.route("/payment/process").post(processPayment);
// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

// //router.route('/callback').post(paytmResponse);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  processPayment,
  verifyPayment,
  sendRazorpayApiKey,
  getPaymentStatus,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/process", processPayment);
router.post("/verify", verifyPayment);
router.get("/razorpayapikey", sendRazorpayApiKey);
router.route("/payment/status/:id").get(isAuthenticatedUser, getPaymentStatus);

module.exports = router;
