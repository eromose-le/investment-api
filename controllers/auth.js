const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, role, country, phoneNumber, email, password } =
    req.body;

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    role,
    country,
    phoneNumber,
    email,
    password,
    role
  });

  const userWalletAddress = user._id.toString();
  const message = `<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      /* FONTS */
      @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }

      /* ANDROID CENTER FIX */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
    </style>
  </head>
  <body
    style="
      background-color: #f3f5f7;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Poppins', sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      We're thrilled to have you here! Get ready to dive into your new account.
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td align="center">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 10px 10px"
              >
                <!-- <a href="#" target="_blank" style="text-decoration: none">
                  <span
                    style="
                      display: block;
                      font-family: 'Poppins', sans-serif;
                      color: #3e8ef7;
                      font-size: 36px;
                    "
                    border="0"
                    ></span
                  >
                </a> -->
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- HERO -->
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Poppins', sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 2px;
                  line-height: 48px;
                "
              >
              <!-- [LOGO] -->
              <!-- <a href="#><img style="width: 15%" src="#" alt="logo" border="0"></a> -->
                <h1 style="font-size: 36px; font-weight: 600; margin: 0; padding: 10;">
                  Thank you for joining us!
                </h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- COPY BLOCK -->
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Poppins', sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0; font-weight: 700">
                  Hi ${firstName}
                </p>
                <br />
                <p style="margin: 0">
                  <b style="color: #2c642b">Congratulations!</b> Your account with [website name] has been activated. Below is your wallet ID required alongside your choice to <a style="text-decoration: none; color: #2c642b" href="/login">
                    sign in
                  </a>
                </p>
              </td>
            </tr>
            <!-- BULLETPROOF BUTTON -->
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 30px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#2c642b"
                          >
                            <p
                              target="_blank"
                              style="
                                font-size: 18px;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #ffffff;
                                text-decoration: none;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 12px 50px;
                                border-radius: 2px;
                                border: 1px solid #2c642b;
                                display: inline-block;
                              "
                              >Your wallet ID : ${userWalletAddress}</p
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 0px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  Make a profit today by investing with your broker, We guarantee you a successful trading/investment experience
                </p>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <!-- <p style="margin: 0">
                </p> -->
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <!-- <p style="margin: 0">
                  If you have any questions, just reply to this email—we're
                  always happy to help out.
                </p> -->
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 40px 30px;
                  border-radius: 0px 0px 0px 0px;
                  color: #666666;
                  font-family: 'Poppins', sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 20px 0 30px 0">Cheers,<br /><span style="color: #2c642b">[Website Name]</span</p>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td align="center" style="padding: 10px 10px 50px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            
    </table>
  </body>
</html>`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Welcome, Wallet Address',
      message
    });

    return res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    return next(new ErrorResponse('Email could not be sent', 500));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { userWalletAddress, password } = req.body;

  //  Validate id and password
  if (!userWalletAddress || !password) {
    return next(new ErrorResponse('Please provide an id or password', 400));
  }

  // Check for user
  const user = await User.findOne({ _id: userWalletAddress }).select(
    '+password'
  );

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  return res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePhoto: req.body.profilePhoto,
    gender: req.body.gender,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.userWalletAddress });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      /* FONTS */
      @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }

      /* ANDROID CENTER FIX */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
    </style>
  </head>
  <body
    style="
      background-color: #f3f5f7;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Poppins', sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      We're thrilled to have you here! Get ready to dive into your new account.
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td align="center">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 10px 10px"
              >
                <!-- <a href="#" target="_blank" style="text-decoration: none">
                  <span
                    style="
                      display: block;
                      font-family: 'Poppins', sans-serif;
                      color: #3e8ef7;
                      font-size: 36px;
                    "
                    border="0"
                    ></span
                  >
                </a> -->
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- HERO -->
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Poppins', sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 2px;
                  line-height: 48px;
                "
              >
              <!-- [LOGO] -->
              <!-- <a href="#><img style="width: 15%" src="#" alt="logo" border="0"></a> -->
                <h1 style="font-size: 36px; font-weight: 600; margin: 0; padding: 10;">
                  Password Reset
                </h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- COPY BLOCK -->
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Poppins', sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <br />
                <p style="margin: 0">
                  You are receiving this email because you (or someone else) has requested the reset of a password. Click <a href="http://localhost:3000/reset-password/${resetToken}" target="_self" style="text-decoration: none; color: #2c642b">
                    to reset.
                  </a>
                </p>
              </td>
            </tr>
            <!-- BULLETPROOF BUTTON -->
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 30px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#2c642b"
                          >
                            <a 
                              href="http://localhost:3000/reset-password/${resetToken}" target="_self"
                              target="_blank"
                              style="
                                font-size: 18px;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #ffffff;
                                text-decoration: none;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 12px 50px;
                                border-radius: 2px;
                                border: 1px solid #2c642b;
                                display: inline-block;
                              "
                              >Click to Reset</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 0px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  <br /> 
                  <hr />
                  If you encountered an error, click the alternate link below
                  <span style="color: #2c642b">${resetUrl}</span>
                </p>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <!-- <p style="margin: 0">
                   <a
                    href="${resetUrl}"
                    target="_blank"
                    style="color: #2c642b"
                    >${resetUrl}</a 
                  >
                </p> -->
              </td>
            </tr>
            <!-- COPY -->
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 40px 30px;
                  border-radius: 0px 0px 0px 0px;
                  color: #666666;
                  font-family: 'Poppins', sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 20px 0 30px 0">Cheers,<br /><span style="color: #2c642b">[Website Name]</span</p>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td align="center" style="padding: 10px 10px 50px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            
    </table>
  </body>
</html>`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    return res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });
};
