const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "/",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });

  res.set("Access-Control-Allow-Origin", req.headers.origin);
  // res.set("Access-Control-Allow-Credentials", "true");
  res.set(
    "Access-Control-Expose-Headers",
    "date, etag, access-control-allow-origin, access-control-allow-credentials"
  );
};

module.exports = sendToken;
