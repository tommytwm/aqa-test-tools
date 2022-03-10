const { TestResultsDB, ObjectID } = require('../Database');

module.exports = async (req, res) => {
    const { testId } = req.query;

    if (!testId) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        const db = new TestResultsDB();
        const result = await db.aggregate([
            {
                $match: { _id: new ObjectID(testId) },
            },
            {
                $project: { possibleIssues: 1 },
            },
        ]);
        if (!result || result.length === 0) {
            res.send({ output: null });
        }
        res.send({ output: { result } });
    }
};
