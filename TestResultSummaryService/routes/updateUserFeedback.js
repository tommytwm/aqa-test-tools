const { TestResultsDB, ObjectID } = require('../Database');

/*
*   updateUserFeedback API updates feedback based on user and issueNumber
*/
module.exports = async (req, res) => {
    // TODO: need to find and update from TestResultsDB
    const { buildId, testId, issueUrl, feedback } = req.query;
    if ( buildId && testId && issueUrl && feedback ) {
        const db = new TestResultsDB();

        //TODO: too many positional elements found in path
        if (feedback > 0) {
            await db.update(
                { _id: new ObjectID(buildId) },
                { $set: { "tests.$._id": testId, "tests.$.possibleIssues.$.issueUrl":issueUrl, "tests.$.possibleIssues.$.positiveCount": feedback }},
                { $upsert: true },
                { multi: true }
            );
        } else {
            await db.update(
                { _id: new ObjectID(buildId) },
                { $set: { "tests.possibleIssues.$.issueUrl":issueUrl, "possibleIssues.negativeCount": feedback }},
                { upsert: true ,
                    multi: true
                },
            );
        }
        
        res.send({ error: false });
    }
    res.json({ error: true });

}