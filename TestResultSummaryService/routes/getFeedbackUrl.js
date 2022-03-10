const { TestResultsDB } = require('../Database');
const ObjectID = require('mongodb').ObjectID;

module.exports = async (req, res) => {
    const { testId } =
        req.query;

    if (!testId) {
        res.send({ error: 'Input parameters are missing' });
    } else {
        const db = new TestResultsDB();
        const result = await db.getData({ _id: new ObjectID(testId) }).toArray();
        console.log(result);
        if (!result || result.length === 0 ) {
            res.send({ output: null }); 
        }
        res.send({ output: { result } });
    }
};
