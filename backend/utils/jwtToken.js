const sendToken = (admin, statusCode, res) => {
    // Create jwt token
    const token = admin.getJwtToken();
  
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, // Set secure flag based on environment
      sameSite: 'none', // Set sameSite attribute for cross-site cookies
    };
  
    // Send token and save in the cookies
    res.status(statusCode)
      .cookie('tkn', token, options)
      .json({
        success: true,
        token,
        admin,
      });
  };
  
  module.exports = sendToken;
  