const jwt = require("jsonwebtoken");

const { TOKEN_KEY, TOKEN_EXPIRE } = process.env;

const createToken = async (tokenData, tokenKey = TOKEN_KEY, expiresIn = TOKEN_EXPIRE) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, {
      expiresIn,
    });

    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = createToken;
