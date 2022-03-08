const { TestResultsDB, ObjectID } = require('../Database');

module.exports = async (req, res) => {
    const { repoName, buildName, issueNumber, issueName, issueCreator, accuracy } =
        req.query;

    if (!repoName || !buildName || !issueName || !issueCreator || !accuracy) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        // TODO: Get Feedback info from db
        const db = new TestResultsDB();
        const result = await db.getData(req.query).toArray();
        res.send({ output: { result: 'success' } });
    }
};
