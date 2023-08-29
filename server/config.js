require('dotenv').config()

const config = {

    port: process.env.PORT || 5000,
    mongo_connection_url: process.env.DB_URL_MONGO,
    secret: btoa("benevityTestSecret"),
    refreshTokenSecret: btoa("benevityTestSecretTokenRefreshSecret"),
    tokenLife: 5900,
    refreshTokenLife: 86400

}

module.exports = config