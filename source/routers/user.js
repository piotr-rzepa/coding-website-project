'use strict';
const express = require('express');
const router = new express.Router();
//const { ERROR } = require('../chalk');
const User = require('../models/User'); //Schemat użytkownika
const { authentication } = require('../database/authentication');
const jwt = require('jsonwebtoken');
const Solution = require('../models/Solution');
const { dbValidation } = require('../database/database-validation');

/**
 * *================================= GET REQUESTS =================================
 */

router.get('/home/page:page', async (req, res) => {
  //Sprawdzamy czy użytkownik ma na tym urządzeniu zalogowaną sesje
  if (req.cookies.JWT === null) {
    res.render('index');
  } else {
    try {
      //Weryfikujemy ciasteczko
      jwt.verify(req.cookies.JWT, toString(process.env.TOKEN_KEY), async function (err, decoded) {
        //Jeżeli ciasteczko się nie zgadza bądź nie ma sesji, renderujemy main page bez panelu użytkownika
        if (err) res.render('index');
        else {
          //Renderujemy panel użytkownika za pomocą danych z ciasteczka
          const user = await User.findOne({ _id: decoded._id, 'tokens.token': req.cookies.JWT });
          if (user) res.render('index', { signIn: true, user: user, skip: req.params.page, lang: req.query.lang });
          else res.render('index');
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: e });
    }
  }
});

router.get('/create', async (req, res) => {
  res.render('sign-up');
});

router.get('/login', async (req, res) => {
  res.render('sign-in');
});

router.get('/users/profile/me', authentication, async (req, res) => {
  //Pobieramy rozwiązania użytkownika
  const uploaded = await Solution.find({ createdBy: req.user._id });
  if (uploaded.length !== 0) {
    //Jeżeli jakieś istnieją, to pobieramy również to najnowsze
    const mostRecent = await Solution.find({ createdBy: req.user._id }).sort({ createdAt: -1 }).limit(1);
    return res.status(200).render('profile', { user: req.user, uploaded: uploaded.length, recent: mostRecent[0]._id });
  } else res.status(200).render('profile', { user: req.user, uploaded: uploaded.length });
});

router.get('/logout', authentication, async (req, res) => {
  try {
    //Niszczymy ciasteczko nadpisując jego czas ważności na = 0
    res.cookie('JWT', { maxAge: 0, overwrite: true });
    //Usuwamy token, który był podstawą danego ciasteczka z tablicy sesji
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    //Zapisujemy i przekierowujemy na stronę bez panelu użytkownika
    await req.user.save();
    res.redirect('/home/page1');
  } catch (e) {
    //console.log(ERROR('/logout', e));
    res.status(500).send({ error: e });
  }
});

router.get('/users/addSolution', authentication, async (req, res) => {
  res.render('solution-form', { user: req.user });
});

/**
 * *================================= POST REQUESTS =================================
 */

router.post('/create', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    await res.redirect('/home/page1');
  } catch (e) {
    if (e === 'MongoError') e.message = 'Email or nickname already exist!';
    //console.log(ERROR('/create', e));
    res.status(400).send({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateToken();
    //tworzenie bezpiecznego ciasteczka
    res.cookie('JWT', token, {
      maxAge: 86400000,
      httpOnly: true,
    });
    res.redirect(`/home/page1`);
  } catch (e) {
    //console.log(ERROR(e));
    res.status(422).send({ error: e.message });
  }
});

/**
 * *================================= PATCH REQUESTS =================================
 */
router.patch('/user/update', authentication, dbValidation, async (req, res) => {
  try {
    if (req.error) throw new Error(req.error);
    //Tablica dozwolonych operacji
    const allowedUpdates = ['name', 'email'];
    const updates = Object.keys(req.body);
    //Sprawdzamy czy użytkownich chce zmienić prawidłową właściwość
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' });
    //Zamiana wartości w properties
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    //console.log(ERROR('/user/update', e));
    res.status(422).send({ error: e.message });
  }
});

router.patch('/user/update/password', authentication, dbValidation, async (req, res) => {
  try {
    if (req.error) throw new Error(req.error);
    //Sprawdzanie, czy stare hasło wpisane przy zmiane odpowiada aktualnemu
    //Zmiana hasła na nowe
    req.user['password'] = req.body['newpassword'];
    await req.user.save();
    res.status(200).send();
    //else throw new Error('old password is wrong!');
  } catch (e) {
    //console.log(ERROR('/user/update/password', e));
    res.status(422).send({ error: e.message });
  }
});

/**
 * *================================= DELETE REQUESTS =================================
 */

router.delete('/user/me', authentication, async (req, res) => {
  try {
    //const user = await User.findByIdAndDelete(req.user._id);
    //                LUB
    //    await req.user.remove();

    //Unieważniamy ciasteczko (tak jak przy wylogowaniu)
    res.cookie('JWT', { maxAge: 0, overwrite: true });

    /*
    Usuwamy tą metoda, ponieważ zapewnia ona również
    kaskadowe usuwanie wszystkich rozwiązań 
    należących do usuwanego użytkownika 
    */
    await req.user.remove();
    res.redirect('/home/page1');
  } catch (e) {
    //console.log(ERROR('DELETE /user/me', e));
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
