/* eslint-disable no-undef */
'use strict';

const request = require('supertest');
const app = require('../source/index');
const User = require('../source/models/User');
const { userOne, populateDB } = require('./fixtures/db');

const userBadData = { nickname: 'la', name: '', email: 'andreithub.com', password: 'Gk' };

// ! Użytkownik nieistniejący w bazie danych -> testowanie błędów
const userNonexistent = {
  nickname: 'pieczara997',
  name: 'Szaman',
  email: 'andrew@github.com',
  password: 'Grszka**182',
};

beforeEach(populateDB);

test('Create new user', async () => {
  const response = await request(app).post('/create').send({
    nickname: 'jajuwa12',
    name: 'Adam',
    email: 'maciek_kowalski@o10.pl',
    password: 'Gr*szka112',
  });
  await expect(response.redirect).toBe(true);

  //Upewnienie że w bazie danych pojawił się taki uzytkownik
  const user = await User.findOne({ email: 'maciek_kowalski@o10.pl', nickname: 'jajuwa12', name: 'Adam' });
  expect(user).not.toBeNull();
  //Sprawdzanie czy hasło zostało zahashowane
  expect(user.password).not.toBe('Gr*szka112');
});

test('Should login existing user', async () => {
  const response = await request(app).post('/login').send({
    email: userOne.email,
    password: userOne.password,
  });
  await expect(response.redirect).toBe(true);

  //Sprawdzanie czy przy logowaniu zostaje wytworzony token uwierzytelniania
  const user = await User.findOne({ email: userOne.email });
  expect(user.tokens[1].token).not.toBeNull();
});

test('Should get user profile', async () => {
  const response = await request(app).get('/users/profile/me').set('Cookie', `JWT=${userOne.tokens[0].token}`).send();
  expect(response.status).toBe(200);
});

test('Should delete user profile', async () => {
  const response = await request(app)
    .delete('/user/me')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send();
  expect(response.redirect).toBe(true);

  const user = await User.findOne({ email: userOne.email });
  expect(user).toBeNull();
});

test('Should update user name', async () => {
  await request(app)
    .patch('/user/update')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ name: 'Adam' })
    .expect(200);

  const user = await User.findOne({ name: 'Adam' });
  expect(user.name).toEqual('Adam');
});

test('Should update user email', async () => {
  await request(app)
    .patch('/user/update')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ email: 'andrzej@o2.pl' })
    .expect(200);

  const user = await User.findOne({ email: 'andrzej@o2.pl' });
  expect(user.email).toEqual('andrzej@o2.pl');
});

test('Should update user password', async () => {
  await request(app)
    .patch('/user/update/password')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ oldpassword: 'Gr*szka192', newpassword: 'B*anan192' })
    .expect(200);
});

test('Should not update user password -> bad old password', async () => {
  await request(app)
    .patch('/user/update/password')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ oldpassword: 'G*szka192', newpassword: 'B*anan192' })
    .expect(422);
});

test('Should not update user password -> new password too weak', async () => {
  await request(app)
    .patch('/user/update/password')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ oldpassword: 'G*szka192', newpassword: 'password' })
    .expect(422);
});

test('Should not update user password -> bad old and new at the same time', async () => {
  await request(app)
    .patch('/user/update/password')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ oldpassword: '', newpassword: '' })
    .expect(422);
});

test('Should not update user password -> bad property', async () => {
  await request(app)
    .patch('/user/update/password')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ old_password: 'jkklj', nepassword: 'lkjk' })
    .expect(422);
});

test('Should not update user email', async () => {
  await request(app)
    .patch('/user/update')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ email: 'andrzejo2.pl' })
    .expect(422);

  const user = await User.findOne({ email: 'andrzej@o2.pl' });
  expect(user).toBeNull();
});

test('Should not update user name', async () => {
  await request(app)
    .patch('/user/update')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({ nname: 'Adam' })
    .expect(400);

  const user = await User.findOne({ name: 'Adam' });
  expect(user).toBeNull();
});

test('Should not delete user profile -> auth fail', async () => {
  await request(app)
    .delete('/user/me')
    .set('Cookie', [`BadCookie=${userOne.tokens[0].token}`])
    .send()
    .expect(401);
});

test('Should not get user profile', async () => {
  await request(app).get('/users/profile/me').send().expect(401);
});

test('Should not create user with bad data', async () => {
  await request(app).post('/create').send(userBadData).expect(400);
});

test('Should not login nonexistent user', async () => {
  await request(app).post('/login').send(userNonexistent).expect(422);
});
test('Should not login with bad data', async () => {
  await request(app).post('/login').send(userBadData).expect(422);
});
