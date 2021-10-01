const { connect } = require("./mongoose");

const port = 8080;

const start = async () => {
  await connect();
  console.log("=========== mongoose connected to mongodb ============")
  const app = require("./app");
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
}

start();