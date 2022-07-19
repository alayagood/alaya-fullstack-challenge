module.exports = {
    app: {
        apiUrl: `${process.env.API_BASE_URL}`,
        apiPort: `${process.env.PORT}`
    },
    database: {
        host: `${process.env.DB_HOST}`,
        port: `${process.env.DB_PORT}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        name: `${process.env.DB_NAME}`
    },
    jwt: {
        secret: `${process.env.JWT_SECRET}`,
        tokenLife: `${process.env.TOKEN_LIFE}`
    },
    cloudinary: {
        cloud_name: `${process.env.CLOUDINARY_NAME}`,
        api_key: `${process.env.CLOUDINARY_API_KEY}`,
        api_secret: `${process.env.CLOUDINARY_API_SECRET}`
    }
};