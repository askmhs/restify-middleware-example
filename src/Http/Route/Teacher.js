import IsTeacher from "./../Middleware/IsTeacher";

module.exports = server => {

    server.get("/teacher", IsTeacher, async (req, res) => {
        try {
            res.json("You have successfully access the teacher page!");
        } catch (exception) {
            res.status(500);
            res.json(exception);
        }
    });
};