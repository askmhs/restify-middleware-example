import jwt from "jsonwebtoken";

module.exports = (req, res, next) => {
    try {
        jwt.verify(req.headers.token, "8e0c836a0731b41daa4eaa508880d694", (err, decoded) => {
            if (!err && decoded.role === "STUDENT") {
                next();
            } else if (!err && decoded.role !== "STUDENT") {
                res.status(403);
                res.json("You are not allowed to access this feature!");
            } else {
                throw err;
            }
        });
    } catch (exception) {
        res.status(500);
        res.json(exception.message);
    }
};