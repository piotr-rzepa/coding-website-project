/* eslint-disable no-undef */
'use strict';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../source/index');
const User = require('../source/models/User');
const Solution = require('../source/models/Solution');

const { userOne, userTwo, solutionOne, solutionTwo, solutionThree, populateDB } = require('./fixtures/db');

beforeEach(populateDB);

test('Should add new solution', async () => {
  await request(app)
    .post('/user/solution/add')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send({
      body: [{ line1: 'Hello' }, { line1: 'Hello' }, { line1: 'Hello' }, { line1: 'Hello' }, { line1: 'Hello' }],
    })
    .expect(200);
});

test('Should not add new solution -> empty body', async () => {
  await request(app)
    .post('/user/solution/add')
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send()
    .expect(400);
});

test('Should delete first solution of user two', async () => {
  await request(app)
    .delete(`/user/solution/${solutionThree._id}`)
    .set('Cookie', [`JWT=${userTwo.tokens[0].token}`])
    .send()
    .expect(200);

  const solution = await Solution.findOne({ _id: solutionThree._id });
  expect(solution).toBeNull();
});

test('Should not delete first solution of user two -> userOne token', async () => {
  await request(app)
    .delete(`/user/solution/${solutionThree._id}`)
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send()
    .expect(404);

  const solution = await Solution.findOne({ _id: solutionThree._id });
  expect(solution).not.toBeNull();
});

test('Should not delete solution -> bad/empty id', async () => {
  await request(app)
    .delete(`/user/solution/`)
    .set('Cookie', [`JWT=${userOne.tokens[0].token}`])
    .send()
    .expect(404);

  const solution = await Solution.findOne({ _id: solutionThree._id });
  expect(solution).not.toBeNull();
});

test('Should not delete solution -> not authenticated', async () => {
  await request(app).delete(`/user/solution/${solutionThree._id}`).set('Cookie', [`JWT=jkjlkjlkji`]).send().expect(401);

  const solution = await Solution.findOne({ _id: solutionThree._id });
  expect(solution).not.toBeNull();
});

test('Should get all solutions', async () => {
  const solutions = await request(app).get('/solutions/all').send().expect(200);
  expect(solutions.body.length).toBe(3);
});
