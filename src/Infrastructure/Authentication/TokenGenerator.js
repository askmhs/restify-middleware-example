import jwt from "jsonwebtoken";

export class TokenGenerator {

    /**
     * Generate token
     *
     * @param data
     * @returns {*}
     */
    static generate(data) {
        return jwt.sign(data, "8e0c836a0731b41daa4eaa508880d694", {
            expiresIn: '3d'
        });
    }
}