import restify from "restify";
import mongoose from "mongoose";

const server = restify.createServer({
    "name": "restify-middleware-example"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

mongoose.connect("mongodb://localhost:27017/example").then(() => {
    console.log("Successfully connected to DB");
}).catch(err => {
    throw err;
});

require("./src/Http/Route/Student")(server);
require("./src/Http/Route/Teacher")(server);
require("./src/Http/Route/Authentication")(server);

server.listen(3000, () => {
    console.log("Server listening at port 3000!");
});