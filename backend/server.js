const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.static(__dirname + '/public'))
app.use(cors())


app.all('*', function (req, res) {
    res.status(200).sendFile(`/`);
});

app.listen(3000, () => console.log(`listening on http://localhost:${3000}`));
