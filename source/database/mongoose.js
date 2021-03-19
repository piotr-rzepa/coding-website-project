'use strict';

const { ERROR, SUCCESS } = require('../chalk');
//Importujemy mongoose - narzędzie do modelowania danych
const mongoose = require('mongoose');

//Natychmiastowe wywołanie funkcji przy importowaniu modułu
(async () => {
  try {
    //Łączymy się z bazą danych
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    //console.log(SUCCESS('Connected to the database!'));
  } catch (e) {
    //console.log(ERROR('Failed to connect to database!', e));
  }
})();
