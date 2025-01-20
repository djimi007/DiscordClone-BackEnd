const http = require("./websockets/wsServer");
const { PORT } = process.env;

const io = require("./websockets/ioConnetction");

const startServer = async () => {
  try {
    io.listen(3000);
    http.listen(PORT);
  } catch (error) {
    console.log("====================================");
    console.log("Error on " + error);
    console.log("====================================");
  }
};

startServer();
