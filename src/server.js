const http = require("./utils/websockets/wsServer");
const { PORT } = process.env;

const startServer = async () => {
  try {
    http.listen(PORT, () => {
      console.log("====================================");
      console.log(`Server Started at Port ${PORT} `);
      console.log("====================================");
    });
  } catch (error) {
    console.log("====================================");
    console.log("Error on " + error);
    console.log("====================================");
  }
};

startServer();
