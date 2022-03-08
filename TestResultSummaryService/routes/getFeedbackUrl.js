const { UserFeedbackDB } = require('../Database');

module.exports = async (req, res) => {
    const { repoName, buildName, issueNumber, issueName, issueCreator, accuracy } =
        req.query;

    if (!repoName || !buildName || !issueName || !issueCreator || !accuracy) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        const db = new UserFeedbackDB();
        const result = await db.getData(issueNumber, issueName).toArray();
        if (!result || result.length === 0 ) {
            res.send({ output: null }); 
        }
        res.send({ output: { result } });
    }
};
