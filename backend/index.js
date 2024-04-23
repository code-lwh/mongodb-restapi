const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()
const uri = process.env.MONGOURI;
const express = require('express')
const cors = require('cors')
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function start() {
  try {
    const app = express()
    const PORT = 8080
    app.get('/', (req, res) => {
        res.send("Hello world")
    })
    app.use(express.json());
    app.use(cors({
      origin: "http://localhost:3000"
    }))
    app.listen(PORT, () => {
        console.log("Running!")
    })
    await client.connect();
    // Get the database and collection on which to run the operation
    const db = client.db("gettingStarted");
    const col = db.collection("userbase");
    // Find all documents
    const documents = await col.find({}).toArray();
    // Print results
    app.get('/api/users', (req, res) => {
      res.status(200).send(documents)
    })
    app.post('/api/newuser', (req, res) => {
      const person = {
        username: req.body.data.username,
        email: req.body.data.email,
        password: req.body.data.password
      }
      col.insertOne(person)
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  // await client.close();
  }
}
start().catch(console.dir);