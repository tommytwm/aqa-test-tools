module.exports = async (req, res) => {
    const { repoName, buildName, issueName, issueCreator, accuracy } =
        req.query;

    if (!repoName || !buildName || !issueName || !issueCreator || !accuracy) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        // TODO: Get Feedback info from db
        res.send({ output: { result: 'success' } });
    }
};
