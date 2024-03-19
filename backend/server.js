const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.static(__dirname + '/public'))
app.use(cors())


app.get('/stuff', (req,res) => {
    res.status(200).json({
        stuff: 'here is some great stuff'
    })
})

app.listen(3000, () => console.log(`listening on http://localhost:${3000}`));
