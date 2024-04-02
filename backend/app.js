const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(express.json())

let submissions = []



app.get('/stuff', (req, res) => {
    res.status(200).json({
        stuff: 'here is some great stuff'
    })
})

app.post('/submissions', (req, res) => {
    try {const { name, email, projectDescription } = req.body;
    const submission = { _id: String(submissions.length + 1), name, email, projectDescription };
    submissions.push(submission);
    console.log(submissions)
    res.status(200).json(submission);
    } catch(err) {
        console.log(err);
    }
})

app.get('/submissions', (req, res) => {
    res.status(200).json(submissions)
})

module.exports = app