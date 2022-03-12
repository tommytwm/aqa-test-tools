const { TestResultsDB, ObjectID } = require('../Database');

module.exports = async (req, res) => {
    const { buildId } = req.query;

    if (!buildId) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        const db = new TestResultsDB();
        const result = await db.aggregate([
            {
                $match: { _id: new ObjectID(buildId) },
            },
            {
                $project: { "tests.possibleIssues": 1 },
            },
        ]);
        if (!result || result.length === 0) {
            res.send({ output: null });
        }
        res.send({ output: { result } });
    }
};
