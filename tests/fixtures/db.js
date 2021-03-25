'use strict';

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../source/models/User');
const Solution = require('../../source/models/Solution');

//! Do testowania uwierzytelniania
const userOneID = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneID,
  nickname: 'langusta12',
  name: 'Andrew',
  email: 'andrew@github.com',
  password: 'Gr*szka192',
  tokens: [{ token: jwt.sign({ _id: userOneID }, toString(process.env.TOKEN_KEY)) }],
};

const userTwoID = new mongoose.Types.ObjectId();

const solutionOne = {
  _id: new mongoose.Types.ObjectId(),
  title: 'test solution1 title',
  language: 'cpp',
  body: [
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
  ],
  createdBy: userOneID,
};

const solutionTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'test solution2 title',
  language: 'csharp',
  body: [
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
  ],
  createdBy: userOneID,
};

const solutionThree = {
  _id: new mongoose.Types.ObjectId(),
  title: 'test solution3 title',
  language: 'python',
  body: [
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
    { line1: 'Hello' },
  ],
  createdBy: userTwoID,
};

const userTwo = {
  _id: userTwoID,
  nickname: 'bulworus997',
  name: 'Kasia',
  email: 'gucio@twitch.pl',
  password: 'Kr*s!sk238',
  tokens: [{ token: jwt.sign({ _id: userTwoID }, toString(process.env.TOKEN_KEY)) }],
};

const populateDB = async () => {
  await User.deleteMany();
  await Solution.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await normalizeSolutions([solutionOne, solutionTwo, solutionThree]);
};

const normalizeSolutions = async (solutions) => {
  for (let sol of solutions) {
    let arr = [];
    for (let line of sol.body) {
      const value = Object.values(line);
      arr.push({ line: value[0] });
    }
    sol.body = arr;
    await new Solution(sol).save();
  }
};

module.exports = { userOne, userTwo, solutionOne, solutionTwo, solutionThree, populateDB };
