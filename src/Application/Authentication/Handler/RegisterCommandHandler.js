import {RegisterCommand} from "../Command/RegisterCommand";
import UserEntity from "../../../Domain/User/Entities/UserEntity";
import {TokenGenerator} from "../../../Infrastructure/Authentication/TokenGenerator";

export class RegisterCommandHandler {

    execute(command) {
        if (command instanceof RegisterCommand) {
            return new Promise(async (resolve, reject) => {
                try {
                    this.command = command;
                    const result = await this.registerData();
                    result.token = TokenGenerator.generate(result);
                    resolve(result);
                } catch (exception) {
                    console.log(exception);
                    reject(exception);
                }
            });
        } else {
            throw new Error("Command must be instanceof RegisterCommand class!");
        }
    }

    async registerData() {
        return UserEntity.create(this.command.data).then(created => {
            let data = created.toJSON();
            delete data.createdAt;
            delete data.updatedAt;
            delete data.password;
            return data;
        }).catch(errCreated => {
            throw errCreated;
        });
    }
}