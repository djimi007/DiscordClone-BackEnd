const User = require("./model");
const { hashData, virifyHashData } = require("../../utils/hashData");
const { createToken } = require("../../utils/createToken");

const authenticateUser = async (data) => {
  try {
    let { email, password } = data;

    const fetchedUser = await User.findOne({ email });

    if (!fetchedUser) throw Error("user don't exict in db");

    if (!fetchedUser.verified) {
      throw Error("User is not verified check the email to complet");
    }

    const hashedPassword = fetchedUser.password;
    const passwordMatch = await virifyHashData(password, hashedPassword);
    if (!passwordMatch) throw Error("invalide password");
    const tokenData = { userId: fetchedUser._id, email };
    const token = await createToken(tokenData);

    fetchedUser.token = token;

    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (data) => {
  try {
    const { name, email, password } = data;
    const existedUser = await User.findOne({
      email,
    });

    if (existedUser) throw Error("User exist in db");

    const hashedPassword = await hashData(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, authenticateUser };
