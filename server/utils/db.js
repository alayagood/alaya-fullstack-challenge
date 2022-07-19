const mongoose = require("mongoose");

const connect = () => {
    const { database: { host, port, user, password, name } } = require("@configs"),
        url = `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`;

    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (e) {
        console.error("Connection error", e.message);
    }

    mongoose.Promise = global.Promise;

    mongoose.connection.once("open", () => {
        console.info("Connected to database");
    });

    mongoose.connection.on("error", (e) => {
        console.error("Error connecting to database  ", e);
    });
};

const disconnect = () => {

    if (!mongoose.connection) {
        return;
    }

    mongoose.disconnect();

    mongoose.connection.once("close", async() => {
        console.info("Diconnected  to database");
    });
};

module.exports = {
    connect,
    disconnect
};
