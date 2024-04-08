const express = require('express');
const app = express();
const cors = require('cors')
const Submission = require('./models/submission')

app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(express.json())


app.post('/submissions', async (req, res) => {
    try {
        const submission = await Submission.create(req.body)
        res.status(200).json(submission);
    } catch (err) {
        console.log(err);
    }
})

app.get('/submissions', async (req, res) => {
    const submission = await Submission.find ({})
    res.status(200).json(submission)
})

module.exports = app