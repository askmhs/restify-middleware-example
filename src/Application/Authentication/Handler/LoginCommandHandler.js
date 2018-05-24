import bcrypt from "bcrypt";
import {LoginCommand} from "../Command/LoginCommand";
import UserEntity from "../../../Domain/User/Entities/UserEntity";
import {TokenGenerator} from "../../../Infrastructure/Authentication/TokenGenerator";

export class LoginCommandHandler {

    execute(command) {
        if (command instanceof LoginCommand) {
            return new Promise(async (resolve, reject) => {
                try {
                    this.command = command;

                    let data = await this.login();
                    data.token = TokenGenerator.generate(data);
                    resolve(data);
                } catch (exception) {
                    reject(exception);
                }
            });
        } else {
            throw new Error("Command must be instanceof LoginCommand class!");
        }
    }

    /**
     * Match data with given credential to DB
     *
     * @returns {Promise<any>}
     */
    async login() {
        return UserEntity.findOne({
            email: this.command.email
        }).select("id + name + username + email + password + role").lean().then(user => {
            const validPassword = bcrypt.compareSync(this.command.password, user.password);
            if (validPassword) {
                delete user.password;
                return user;
            } else {
                throw new Error("Password didn't match!");
            }
        }).catch(errUser => {
            throw errUser;
        });
    }
}