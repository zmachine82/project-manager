const mongoose = require('mongoose')
const clearDatabase = require('./clearDatabase')

require('dotenv').config({ path: './.env.test.local' });

function databaseTest() {
    beforeAll(async () => {
        await mongoose.connect(`${ process.env.MONGO_DB}`)
    })

    beforeEach(async () => {
        await clearDatabase()
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
}

module.exports = databaseTest