const {
  MongoClient
} = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useUnifiedTopology: true
});


async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db("fruitsDB")

    const fruitsCollection = database.collection("fruits")

    // Establish and verify connection
    await database.command({
      ping: 1
    });
    console.log("Connected successfully to server");

    const docs = [{
        name: "cake",
        healthy: false
      },
      {
        name: "lettuce",
        healthy: true
      },
      {
        name: "donut",
        healthy: false
      }
    ];



    // this option prevents additional documents from being inserted if one fails
    const options = {
      ordered: true
    };
    const result = await fruitsCollection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insertDocuments(database, docs) {

  const fruitsCollection = database.collection("fruits")

  // this option prevents additional documents from being inserted if one fails
  const options = {
    ordered: true
  };
  const result = await fruitsCollection.insertMany(docs, options);
  console.log(`${result.insertedCount} documents were inserted`);

}

run().catch(console.dir);
