const express = require("express")
const router = express.Router()
const {client} = require("../database/mongodbconnect")

router.get("/", async(req, res) => {
    res.send("This is the MongoDB page request")
    const a = await client.db("FitnessGPT").collection("Users").find().toArray()
    a.map((PT) => (console.log(PT.Clients)))
})

module.exports = router