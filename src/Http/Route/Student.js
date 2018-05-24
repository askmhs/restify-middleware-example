import IsStudent from "./../Middleware/IsStudent";

module.exports = server => {

    server.get("/student", IsStudent, async (req, res) => {
        try {
            res.json("You have successfully access the student page!");
        } catch (exception) {
            res.status(500);
            res.json(exception);
        }
    });
};