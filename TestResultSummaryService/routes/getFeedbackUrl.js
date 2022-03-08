const { UserFeedbackDB } = require('../Database');

module.exports = async (req, res) => {
    const { repoName, buildName, issueNumber, issueName, issueCreator, accuracy } =
        req.query;

    if (!repoName || !buildName || !issueName || !issueCreator || !accuracy) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        // TODO: Get Feedback info from db
        const db = new UserFeedbackDB();
        const result = await db.getData({issueNumber: "1234", issueCreator: "tommy-test"}).toArray();
        console.log(result);
        res.send({ output: { result: 'success' } });
    }
};
