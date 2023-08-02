const express = require("express");
const fetch = require('cross-fetch');
const { client, connect } = require('./database/mongodbconnect');
const app = express();
const cors = require("cors");
app.use(cors());
require('dotenv').config();
app.use(express.json()); // Add this line to parse JSON request bodies
const GPTendpoint = require('./endpoints/GPT')
const mongodbEndpoint = require('./endpoints/mongodb')
app.use("/GPT",GPTendpoint)
app.use("/mongodb",mongodbEndpoint)


app.get('/', async function (req, res) {
  res.send("Welcome to FinesstGPT API ");
});

const port = process.env.PORT || 8080;


(async () => {
  await connect(); // Connect to MongoDB before starting the server
  app.listen(port, () => { console.log("listening on port", port) });
})();

