const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Kaival:1234@cluster0.tqbmdtf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = {
  connect: async function () {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  },
  client: client,
};
