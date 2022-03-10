const { TestResultsDB, ObjectID } = require('../Database');

/*
*   updateUserFeedback API updates feedback based on user and issueNumber
*/
module.exports = async (req, res) => {
    // TODO: need to find and update from TestResultsDB
    const { testId, issueNumber, feedback } = req.query;
    if ( testId && issueNumber && feedback ) {
        const db = new TestResultsDB();
        await db.update(
            { _id: new ObjectID(testId) },
            { $set: { "possibleIssues.$.issueNumber":issueNumber, "possibleIssues.$.feedbackCount": feedback }},
            { upsert: true }
        );
        res.send({ error: false });
    }
    res.json({ error: true });

}