const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]  //Bearer token
        if(!token) {
            return  res.status(401).json({message: "Пользователь не авторизован"})
        }

        const decoced = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoced
        next()
    } catch (e) {
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}