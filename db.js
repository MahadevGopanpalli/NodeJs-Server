const MongoClient = require('mongodb').MongoClient;

const url = 'mongoUrl';

var cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("dbname");
  cachedDb = db;
  return db;
}

module.exports.connect = connectToDatabase;
