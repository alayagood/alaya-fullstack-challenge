const jwt = require('jsonwebtoken');

async function protect(req, res, next){
    const token = req.headers.authorization;

    if(!token)
        return res.status(401).send({error:'No auth token provided'});

    let decodedJwt;
    try {
        decodedJwt = jwt.verify(token, process.env.SECRET);
    } catch(err) {
        console.error(`Invalid token ${JSON.stringify(err)}`);
        return res.status(401).send({ error: "Invalid or expired token" });
    }

    const { userId } = decodedJwt;

    req.userId = userId;
    next();
}

  module.exports = protect;