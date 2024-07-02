// const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const paytm = require("paytmchecksum");
// const https = require("https");
// const Payment = require("../models/paymentModel");
// const ErrorHandler = require("../utils/errorHandler");
// const { v4: uuidv4 } = require("uuid");

// exports.processPayment = asyncErrorHandler(async (req, res, next) => {
//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//     metadata: {
//       company: "Flipkart",
//     },
//   });

//   res.status(200).json({
//     success: true,
//     client_secret: myPayment.client_secret,
//   });
// });

// exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });

// //Process Payment

// exports.processPayment = asyncErrorHandler(async (req, res, next) => {
//   const { amount, email, phoneNo } = req.body;

//   var params = {};

//   /* initialize an array */
//   params["MID"] = process.env.PAYTM_MID;
//   params["WEBSITE"] = process.env.PAYTM_WEBSITE;
//   params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
//   params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE;
//   params["ORDER_ID"] = "oid" + uuidv4();
//   params["CUST_ID"] = process.env.PAYTM_CUST_ID;
//   params["TXN_AMOUNT"] = JSON.stringify(amount);
//   // params["CALLBACK_URL"] = `${req.protocol}://${req.get("host")}/api/v1/callback`;
//   params["CALLBACK_URL"] = `https://${req.get("host")}/api/v1/callback`;
//   params["EMAIL"] = email;
//   params["MOBILE_NO"] = phoneNo;

//   let paytmChecksum = paytm.generateSignature(
//     params,
//     process.env.PAYTM_MERCHANT_KEY
//   );
//   paytmChecksum
//     .then(function (checksum) {
//       let paytmParams = {
//         ...params,
//         CHECKSUMHASH: checksum,
//       };

//       res.status(200).json({
//         paytmParams,
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

// // Paytm Callback
// exports.paytmResponse = (req, res, next) => {
//   // console.log(req.body);

//   let paytmChecksum = req.body.CHECKSUMHASH;
//   delete req.body.CHECKSUMHASH;

//   let isVerifySignature = paytm.verifySignature(
//     req.body,
//     process.env.PAYTM_MERCHANT_KEY,
//     paytmChecksum
//   );
//   if (isVerifySignature) {
//     // console.log("Checksum Matched");

//     var paytmParams = {};

//     paytmParams.body = {
//       mid: req.body.MID,
//       orderId: req.body.ORDERID,
//     };

//     paytm
//       .generateSignature(
//         JSON.stringify(paytmParams.body),
//         process.env.PAYTM_MERCHANT_KEY
//       )
//       .then(function (checksum) {
//         paytmParams.head = {
//           signature: checksum,
//         };

//         /* prepare JSON string for request */
//         var post_data = JSON.stringify(paytmParams);

//         var options = {
//           /* for Staging */
//           hostname: "securegw-stage.paytm.in",
//           /* for Production */
//           // hostname: 'securegw.paytm.in',
//           port: 443,
//           path: "/v3/order/status",
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Content-Length": post_data.length,
//           },
//         };

//         // Set up the request
//         var response = "";
//         var post_req = https.request(options, function (post_res) {
//           post_res.on("data", function (chunk) {
//             response += chunk;
//           });

//           post_res.on("end", function () {
//             let { body } = JSON.parse(response);
//             // let status = body.resultInfo.resultStatus;
//             // res.json(body);
//             addPayment(body);
//             // res.redirect(`${req.protocol}://${req.get("host")}/order/${body.orderId}`)
//             res.redirect(`https://${req.get("host")}/order/${body.orderId}`);
//           });
//         });

//         // post the data
//         post_req.write(post_data);
//         post_req.end();
//       });
//   } else {
//     console.log("Checksum Mismatched");
//   }
// };

// const addPayment = async (data) => {
//   try {
//     await Payment.create(data);
//   } catch (error) {
//     console.log("Payment Failed!");
//   }
// };

// exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
//   const payment = await Payment.findOne({ orderId: req.params.id });

//   if (!payment) {
//     return next(new ErrorHandler("Payment Details Not Found", 404));
//   }

//   const txn = {
//     id: payment.txnId,
//     status: payment.resultInfo.resultStatus,
//   };

//   res.status(200).json({
//     success: true,
//     txn,
//   });
// });

// // const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
// // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// // const Payment = require("../models/paymentModel");
// // const ErrorHandler = require("../utils/errorHandler");

// // exports.processPayment = asyncErrorHandler(async (req, res, next) => {
// //   try {
// //     const myPayment = await stripe.paymentIntents.create({
// //       amount: req.body.amount,
// //       currency: "inr",
// //       metadata: {
// //         company: "Flipkart",
// //       },
// //     });

// //     if (!myPayment) {
// //       return next(new ErrorHandler("Payment processing failed", 400));
// //     }

// //     res.status(200).json({
// //       success: true,
// //       client_secret: myPayment.client_secret,
// //     });
// //   } catch (error) {
// //     return next(new ErrorHandler(error.message, 500));
// //   }
// // });

// // exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
// //   try {
// //     const stripeApiKey = process.env.STRIPE_API_KEY;
// //     if (!stripeApiKey) {
// //       return next(new ErrorHandler("Stripe API key not found", 500));
// //     }

// //     res.status(200).json({ stripeApiKey });
// //   } catch (error) {
// //     return next(new ErrorHandler(error.message, 500));
// //   }
// // });

// // exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
// //   try {
// //     const payment = await Payment.findOne({ orderId: req.params.id });

// //     if (!payment) {
// //       return next(new ErrorHandler("Payment Details Not Found", 404));
// //     }

// //     const txn = {
// //       id: payment.txnId,
// //       status: payment.resultInfo.resultStatus,
// //     };

// //     res.status(200).json({
// //       success: true,
// //       txn,
// //     });
// //   } catch (error) {
// //     return next(new ErrorHandler(error.message, 500));
// //   }
// // });

const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.processPayment = asyncErrorHandler(async (req, res, next) => {
  const { amount } = req.body;
  console.log(amount);
  const options = {
    amount: amount,
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    amount: order.amount,
    id: order.id,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

exports.verifyPayment = asyncErrorHandler(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    console.log("hi");
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    // console.log(payment);
    res.status(200).json({
      success: true,
      payment,
      status: "successful",
    });
  } else {
    return next(new ErrorHandler("Payment verification failed", 400));
  }
});

exports.sendRazorpayApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    razorpayApiKey: process.env.RAZORPAY_KEY_ID,
  });
});
exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
  const payment = await Payment.findOne({ orderId: req.params.id });

  if (!payment) {
    return next(new ErrorHandler("Payment Details Not Found", 404));
  }

  const txn = {
    id: payment.txnId,
    status: payment.resultInfo.resultStatus,
  };

  res.status(200).json({
    success: true,
    txn,
  });
});
