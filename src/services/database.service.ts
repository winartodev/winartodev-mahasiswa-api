import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { mahasiswa?: mongoDB.Collection } = {}

export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost:27017");
          
  await client.connect();
      
  const db: mongoDB.Db = client.db("mahasiswaDB");

  const mahasiswaCollection: mongoDB.Collection = db.collection("mahasiswa");

collections.mahasiswa = mahasiswaCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${mahasiswaCollection.collectionName}`);
}

