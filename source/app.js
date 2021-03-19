'use strict';
const app = require('./index');
const { INFO } = require('./chalk');

//Nasłuchiwanie połączeń z serwerem
app.listen(process.env.PORT, () => {
  console.log(INFO(`Listening for connections at http://localhost:${process.env.PORT}`));
});
