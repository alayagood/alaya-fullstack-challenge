const appVars = {
    port: process.env.PORT,
    apiSecret: process.env.API_SECRET,
    db: {
        mongoUser: process.env.MONGO_USER,
        mongoPass: process.env.MONGO_PASS,
        mongoDatabase: process.env.MONGO_DATABASE,
    }
}

module.exports = {
    ...appVars,
}
