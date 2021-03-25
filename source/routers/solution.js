'use strict';
const express = require('express');
const router = new express.Router();
//const { ERROR } = require('../chalk');
const User = require('../models/User'); //Schemat użytkownika
const Solution = require('../models/Solution');
const { authentication } = require('../database/authentication');
const dateFormat = require('dateformat');

/**
 * *================================= GET REQUESTS =================================
 */
router.get('/solution/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await Solution.findById(id);
    const owner = await User.findById(solution.createdBy);
    if (!solution || !owner) throw new Error("couldn't find solution");
    //Wysyłamy ilość linii aby wygenerować odpowiednią ilość pól
    if (req.cookies.JWT === null) {
      res.render('solution-page', {
        linesNumber: solution.body.length,
        solution: JSON.stringify(solution),
        author: owner.nickname,
        title: solution.title,
        loggedIn: true,
      });
    } else {
      res.render('solution-page', {
        linesNumber: solution.body.length,
        solution: JSON.stringify(solution),
        author: owner.nickname,
        title: solution.title,
        loggedIn: false,
      });
    }
  } catch (e) {
    //console.log(ERROR('/solutions', e));
  }
});

router.get('/solutions/all', async (req, res) => {
  try {
    let solutions;
    //Brak podanego języka - pobieramy wszystkie (posortowane)
    if (!req.query.lang && !req.query.title) {
      solutions = await Solution.find({})
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort({ createdAt: -1 });
    }
    //Pobieramy wszystkie rozwiązania w danym języku
    else if (req.query.lang && !req.query.title)
      solutions = await Solution.find({ language: req.query.lang })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort({ createdAt: -1 });
    else if (!req.query.lang && req.query.title) {
      solutions = await Solution.find({ title: req.query.title })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort({ createdAt: -1 });
    } else {
      solutions = await Solution.find({ title: req.query.title, language: req.query.lang })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort({ createdAt: -1 });
    }

    //Aby można było dynamicznie dodać property 'author'
    solutions = JSON.parse(JSON.stringify(solutions));
    for (let i = 0; i < solutions.length; ++i) {
      const owner = await User.findById(solutions[i].createdBy);
      solutions[i].author = owner.nickname;
      solutions[i].createdAt = dateFormat(
        new Date(solutions[i].createdAt),
        'dddd, mmmm dS, yyyy, h:MM:ss TT',
      );
    }
    res.status(200).send(solutions);
  } catch (e) {
    //console.log(ERROR('/solutions/all', e));
    res.status(400).send({ error: e });
  }
});

router.get('/user/solution/all', authentication, async (req, res) => {
  try {
    //Pobieranie wszystkich rozwiązań danego użytkownika
    const userSolutions = await Solution.find({ createdBy: req.user._id });
    res.render('user-solutions', { userSolutions: JSON.stringify(userSolutions) });
  } catch (e) {
    //console.log(ERROR('/user/solution/all', e));
    res.status(400).send({ error: e });
  }
});

/**
 * *================================= POST REQUESTS =================================
 */

router.post('/user/solution/add', authentication, async (req, res) => {
  try {
    let arr = [];
    req.body.createdBy = req.user._id;
    /*Tworzymy tablicę z własnością linii (line), ponieważ dane przychodzące
    zawierają linie ponumerowane (line1, line2)
    a potrzebne jest uogólnienie do jednej własności */
    for (let line of req.body.body) {
      const value = Object.values(line);
      arr.push({ line: value[0] });
    }
    req.body.body = arr;
    const solution = new Solution(req.body);
    await solution.save();
    res.status(200).send();
  } catch (e) {
    //console.log(ERROR('/user/solution/add', e));
    res.status(400).send();
  }
});

/**
 * *================================= PATCH REQUESTS =================================
 */

/**
 * *================================= DELETE REQUESTS =================================
 */

router.delete('/user/solution/:id', authentication, async (req, res) => {
  try {
    const solution = await Solution.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!solution) return res.status(404).send();
    else res.status(200).send();
  } catch (e) {
    //console.log(ERROR('DELETE /user/solution/:id', e));
    res.status(500).send(e);
  }
});

module.exports = router;
