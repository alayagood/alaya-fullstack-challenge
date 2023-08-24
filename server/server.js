const dotenv = require('dotenv')

dotenv.config({path: './configuration/.env', debug: true})

const db = require("./db");
const app = require('./app');

const port = process.env.port || 3001;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => console.log(`Server running on port ${port}`));
