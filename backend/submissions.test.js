const request = require('supertest');
const app = require('./app')
const databaseTest = require('./databaseTest');

describe('Submissions', () => {
    databaseTest()
    it('should be able to add submissions and defaults project name to the id', () => {
        return request(app)
            .post('/submissions')
            .send({
                name: 'Nonprofit Billy',
                email: 'billy@place.com',
                projectDescription: 'I need help because I am tech iliterated'
            })
            .expect(200)
            .then(response => {
                expect(response.body._id).toBeTruthy()
                expect(response.body.projectName).toEqual(response.body._id)
            })
    })

    it('should be able to get previously posted submissions', async () => {
        const randomName = 'Nonprofit Billy' + Math.floor(Math.random() * 10)
        const res = await request(app)
            .post('/submissions')
            .send({
                name: randomName,
                email: randomName + '@place.com',
                projectDescription: 'I need help because I am tech iliterated'
            });


        return request(app)
            .get('/submissions')
            .expect(200)
            .then(response => {
                expect(response.body.filter(x => x.name === randomName).length > 0).toBe(true)
            })
    })
})
