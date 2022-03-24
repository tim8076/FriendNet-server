const jwt = require('jsonwebtoken');


// jwt加密函式
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
}

// jwt驗證函式
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookieToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    signed: true,
    sameSite: 'none', // sameSite:'none'
    secure: false,
    domain: 'http://localhost:8080',
  })
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookieToResponse,
}