const app = require("./app");

const { PORT } = process.env;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("====================================");
      console.log(`Server Started at Port ${PORT}`);
      console.log("====================================");
    });
  } catch (error) {
    console.log("====================================");
    console.log("Error on " + error);
    console.log("====================================");
  }
};

startServer();
