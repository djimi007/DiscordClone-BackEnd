const bcrypt = require("bcrypt");

const virifyHashData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    console.log("hna error");

    throw error;
  }
};

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw error;
  }
};
module.exports = { hashData, virifyHashData };
