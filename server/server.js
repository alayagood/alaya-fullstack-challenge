const dotenv = require('dotenv')
const app = require('./app');
const db = require("./db");

dotenv.config({path: './configuration/config.env'})

const port = process.env.port || 3001;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => console.log(`Server running on port ${port}`));
