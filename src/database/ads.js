const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'ads';

async function insertAd(ad) {
  const database = await getDatabase();
  const collectionVar = database.collection(collectionName);
  const {insertedId} = await collectionVar.insertOne(ad);
  return insertedId;
}

async function getAds() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function updateAd(id, ad) {
  const database = await getDatabase();
  const collectionVar = database.collection(collectionName);
  return await collectionVar.updateOne({"_id": ObjectId(id)}, {$set:{...ad}});
}

async function deleteAd(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

module.exports = {
  insertAd,
  getAds,
  updateAd,
  deleteAd,
};