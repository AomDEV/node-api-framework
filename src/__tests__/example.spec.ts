import app from "../app";
import request from 'supertest';

describe("An example api endpoint", () => {
    it('Test something all', (done: any) => {
        request(app.unitTest())
            .get('/api/v1/example/something')
            .set('Accept', 'application/json')
            .expect({status:true,data:{callback:7.000000000000001}})
            .expect(200, done)
    });
    it('Test something ID #1', (done: any) => {
        request(app.unitTest())
            .get('/api/v1/example/something/1')
            .set('Accept', 'application/json')
            .expect({status:true,data:{price:1, callback:0.07}})
            .expect(200, done)
    });
    it('Test bad input', (done: any) => {
        request(app.unitTest())
            .get('/api/v1/example/something/a')
            .set('Accept', 'application/json')
            .expect({status:false,message:"ID is not a numeric"})
            .expect(400, done)
    });
});

afterAll(() => {
    app.truncateDB();
    app.close();
});
