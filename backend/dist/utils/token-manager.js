import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Error", data: "Token not recived" });
    }
    //check wheather token is valid or not.
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject();
                return res.status(401).json({ message: "Error", data: "Token Expired" });
            }
            else {
                resolve();
                //success contains payload of JWT token
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map