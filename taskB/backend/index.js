// const awsServerlessExpress = require("@vendia/serverless-express");
const awsServerlessExpress = require("aws-serverless-express");

const { connect } = require("./mongoose");

let connection = null;

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; // allows the past connection to persist

  if (connection === null) {
    connection = await connect();
  }
  const app = require("./app");
  const server = awsServerlessExpress.createServer(app);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
