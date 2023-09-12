import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-stack';

async function run() {
    await mongoose.connect(MONGO_URI);
}

run().catch(err => console.log(err));

const db = mongoose.connection;

export default db;
