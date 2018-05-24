import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMINISTRATOR", "STUDENT", "TEACHER"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

user.pre('save', function (next) {
    let user = this;

    bcrypt.hash(user.password, bcrypt.genSaltSync(12), function (error, result) {
        if (error) {
            return next(error);
        } else {
            user.password = result;
        }

        next();
    });
});

const User = mongoose.model("User", user);
module.exports = User;