//my modules
const {app} = require('./../index');
const expect = require('expect');
const request = require('supertest');

const {User} = require('./../models/user');

//user tests
describe('USER TESTS', () => {
  describe('GET /api/users', () => {

    //not working
    it('should return user if authenticated ', (done) => {
      request(app)
        .get('/api/users')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.emailAddress).toBe(users[0].emailAddress);
        })
        .end(done);
    });

    it('should return a 401 if not authenticated', (done) => {
      request(app)
       .get('/api/users')
       .expect(401)
       .expect(res => {
        expect(res.body).toEqual({"message": "You are not authorized to be here"});
       })
       .end(done);
    });
  });
  });
