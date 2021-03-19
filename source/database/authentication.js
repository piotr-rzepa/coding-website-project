'use strict';

const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User');

/*Middleware function, sprawdzająca czy token uwierzytelniania jest poprawny
Umożliwia podjęcie takich akcji jak dodanie rozwiązania i inne rzeczy związane z kontem użytkownika */
const authentication = async (req, res, next) => {
  try {
    //Pobieramy header z żądania i wyciągamy z niego token
    //const token = req.header('Authorization').replace('Bearer ', '');
    //Dekodujemy token i sprawdzamy, czy jest prawidłowy
    const token = req.cookies.JWT;
    const decodedToken = jsonwebtoken.verify(token, toString(process.env.TOKEN_KEY));
    //Znajdujemy użytkownika na podstawie id ze zdekodowanego tokenu oraz samego tokenu
    const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });
    if (!user) throw new Error('User not found!');
    else {
      //Dodajemy token i użytkownika jako część requestu aby ułatwić sobie pracę
      req.token = token;
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = {
  authentication,
};
