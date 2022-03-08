const { UserFeedbackDB } = require('../Database');

/*
*   updateUserFeedback API updates feedback based on user and issueNumber
*/
module.exports = async (req, res) => {
    const { issueNumber, issueCreator, feedback } = req.query;
    if ( issueNumber && issueCreator && feedback ) {
        const db = new UserFeedbackDB();
        await db.update(
            { issueNumber: issueNumber },
            { $set: { feedback: feedback }},
            { upset: true }
        );
        res.send({ error: false });
    }
    res.json({ error: true });

}