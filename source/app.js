'use strict';
const app = require('./index.js');
//const { INFO } = require('./chalk.js');
const port = process.env.PORT || 3000;

//Nasłuchiwanie połączeń z serwerem
app.listen(port, () => {
  console.log(`Listening for connections at http://localhost:${port}`);
});
