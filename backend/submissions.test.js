const request = require('supertest');


describe('Submissions', () => {
    let app;
    beforeEach(() => {
        app = require('./app')
    })
    it('should be able to add submissions', () => {
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