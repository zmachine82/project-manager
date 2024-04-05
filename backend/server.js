const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config();

connectToDb().then(() => {
    app.listen(3000, () => console.log(`listening on http://localhost:${3000}`));
})

async function connectToDb() {
    await mongoose.connect(`${process.env.MONGO_DB}`)
}
