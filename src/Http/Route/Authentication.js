import {Decorator} from "../../Application/Decorator";
import {LoginCommand} from "../../Application/Authentication/Command/LoginCommand";
import {RegisterCommand} from "../../Application/Authentication/Command/RegisterCommand";
import {LoginCommandHandler} from "../../Application/Authentication/Handler/LoginCommandHandler";
import {RegisterCommandHandler} from "../../Application/Authentication/Handler/RegisterCommandHandler";

module.exports = server => {

    const director = require("director.js");
    const promiseBus = director();

    server.post("/register", async (req, res) => {
        try {
            RegisterCommand.prototype.ID = "RegisterCommand";
            promiseBus.registry.register(RegisterCommand.prototype.ID, new RegisterCommandHandler());
            const bus = new Decorator(promiseBus);
            const result = await bus.handle(new RegisterCommand(req.body));
            res.json(result);
        } catch (exception) {
            res.status(500);
            res.json(exception.message);
        }
    });

    server.post("/login", async (req, res) => {
        try {
            LoginCommand.prototype.ID = "LoginCommand";
            promiseBus.registry.register(LoginCommand.prototype.ID, new LoginCommandHandler());
            const bus = new Decorator(promiseBus);
            const result = await bus.handle(new LoginCommand(req.body.email, req.body.password));
            res.json(result);
        } catch (exception) {
            res.status(500);
            res.json(exception.message);
        }
    });
};