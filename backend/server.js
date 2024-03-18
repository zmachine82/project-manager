const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.status(200).send('<h1>this is a great app</h1>')
})
app.listen(3000, () => console.log(`listening on http://localhost:${3000}`));
