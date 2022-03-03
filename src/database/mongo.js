const {MongoClient} = require('mongodb');
const {MongoMemoryServer} = require('mongodb-memory-server');

async function startDatabase() {
    // const mongo = new MongoClient();
    // const mongoDBURL = await mongo.getConnectionString();
    const mongo = await MongoMemoryServer.create();
    const mongoDBURL = mongo.getUri();  
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};