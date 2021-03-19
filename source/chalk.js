'use strict';
// Do stylizowania i pomocy przy napisach z terminala
const chalk = require('chalk');

const ERROR = chalk.bgRed.black;
const WARNING = chalk.bgKeyword('orange').black;
const INFO = chalk.bgBlue.black;
const SUCCESS = chalk.bgGreen.black;

// console.log(ERROR('Error!'));
// console.log(WARNING('Waring!'));
// console.log(INFO('Info!'));
// console.log(SUCCESS('Success!'));

module.exports = { ERROR, WARNING, INFO, SUCCESS };
