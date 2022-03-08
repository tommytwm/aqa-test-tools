const { UserFeedbackDB } = require('../Database');

/*
*   updateUserFeedback API updates feedback based on user and issueNumber
*/
module.exports = async (req, res) => {
    const { _id, feedback } = req.query;
    if ( _id && feedback ) {
        const db = new UserFeedbackDB();
        await db.update(
            { _id: new OBjectID(_id) },
            { $set: { feedback: feedback }},
            { upsert: true }
        );
        res.send({ error: false });
    }
    res.json({ error: true });

}