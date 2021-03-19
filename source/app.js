'use strict';
const app = require('./index.js');
const { INFO } = require('./chalk.js');

//Nasłuchiwanie połączeń z serwerem
app.listen(process.env.PORT, () => {
  console.log(INFO(`Listening for connections at http://localhost:${process.env.PORT}`));
});
