import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // URI для подключения к MongoDB
const dbName = 'myDatabase'; // Название вашей базы данных

let client: MongoClient;
let db: Db;

export async function connectDatabase() {
  client = new MongoClient(uri);
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(dbName);
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}
