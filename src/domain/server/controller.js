const User = require("../user/model");
const ServerModel = require("./model");

const getAllServers = async ({ userId }) => {
  try {
    const servers = await ServerModel.find({ creatorId: userId });
    return servers;
  } catch (error) {
    throw error;
  }
};

const createServer = async ({ name, creatorId }) => {
  try {
    const existedUser = User.findById(creatorId);
    // const existedUser = await User.findOne({ email });
    if (!existedUser) throw Error("user dont exist need to sign-up");

    if (!existedUser.verified) {
      throw Error("you need to verify you accout befor creating server");
    }
    const resultToken = verifyToken(existedUser.token);

    if (!resultToken) throw Error("try to reconnect you token has expired");

    const newServer = await ServerModel({
      creatorId,
      name,
    });
    const createdServer = await newServer.save();

    return createdServer;
  } catch (error) {
    throw error;
  }
};

module.exports = { createServer, getAllServers };
