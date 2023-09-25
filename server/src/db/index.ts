import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

async function run() {
    await mongoose.connect(MONGO_URI);
}

run().catch(err => console.log(err));

const db = mongoose.connection;

export default db;
