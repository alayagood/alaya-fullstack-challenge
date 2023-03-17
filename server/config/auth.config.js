// We could put the secrets in .env locally and in a secrets manager for the other 
// environments, but I chose to leave hard coded to reduce the task's complexity
const authConfig = {
  jwt_secret: 'JWT_SECRET'
};
 
module.exports = authConfig;