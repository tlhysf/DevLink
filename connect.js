const { MongoClient } = require("mongodb");
const url = require('./config/keys').mongoURI;

const client = new MongoClient(url);

async function runMongo() {
    try {
        await client.connect();
        console.log("Connected correctly to MongoDB");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

runMongo().catch(console.dir);

exports.runMongo = runMongo;
exports.client = client;