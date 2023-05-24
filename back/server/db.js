import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_CONNECTION_STRING;
let db;

const dbConnect = async () => {
    try {
        if (db) {
            return db;
        }
        console.log('Connecting to MongoDB...');
        const client = new MongoClient(uri);
        await client.connect();
        db = client;
        console.log('Connected to db');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};

export default dbConnect;
