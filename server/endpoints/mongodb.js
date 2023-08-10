const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');
const { client } = require("../database/mongodbconnect");

const temp_user = "64ca84db01ece3a9b4a81f00";
const database = client.db("FitnessGPT");
const Users = database.collection("Users");

router.get("/", async (req, res) => {
    res.send("This is the MongoDB page request");
});

router.post("/Clients", async (req, res) => {
    try {
        const { UserUID } = req.body || temp_user;
        const query = { uid: UserUID };
        const Client_Data = await Users.findOne(query);

        if (Client_Data) {
            res.status(200).send(Client_Data.Clients); // Sending the client data as the response
        } else {
            res.sendStatus(404); // If the user with the given UID is not found, send a 404 status code
        }
    } catch (error) {
        console.error("Error while fetching user clients:", error);
        res.sendStatus(500); // Sending a server error status if an exception occurs
    }
});

router.get("/Clients/id", async (req, res) => {
    try {
        const requestedUserId = req.body.Userid || temp_user;
        const requestedClientId = req.body.Userid || temp_user;
        const query = { _id: new ObjectId(requestedUserId) };
        const user = await Users.findOne(query);

        if (user && user.Clients && user.Clients["Kaival"]) {
            console.log(user.Clients["Kaival"]); // The client data with the searched ObjectId value
        } else {
            console.log(user);
        }
    } catch (error) {
        console.error("Error while fetching client:", error);
        res.sendStatus(500); // Sending a server error status if an exception occurs
    }
});

router.post("/add/Clients", async (req, res) => {
    try {
        const { UserUID, ClientUUID, Name } = req.body

        console.log(UserUID, ClientUUID,Name)
        const filter = { uid: UserUID };
        const options = { upsert: false };
        const updateDoc = {
            $set: {
                [`Clients.${ClientUUID}`]: { Name: Name,months: { jan: { "diet": "added new client" } } },
            },
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (error) {
        console.error("Error while adding client:", error);
        res.sendStatus(500); // Sending a server error status if an exception occurs
    }
});

router.post("/add/Users", async (req, res) => {
    try {
        const { uid, Email } = req.body;
        console.log(uid, Email);

        // Check if the user with the given UID already exists in the database
        const existingUser = await Users.findOne({ uid });

        if (existingUser) {
            console.log(`User with UID ${uid} already exists.`);
            return res.sendStatus(200); // Sending a success status without adding the user again
        }

        const doc = {
            uid: uid,
            Email: Email,
            Clients: {}
        };

        await Users.insertOne(doc);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error while adding user:", error);
        res.sendStatus(500); // Sending a server error status if an exception occurs
    }
});

module.exports = router;
