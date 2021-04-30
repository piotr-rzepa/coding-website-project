# coding-website-project
Fullstack website based on MongoDB Cluster, that allows user to create an account, add "forms" with highlighted code and preview other's forms.</br>
Strona z bazą danych (MongoDB) pozwalająca na stworzenie konta i umieszczanie kodu w różnych językach<br/>
#### Link to application, deployed in heroku cloud service: [coding-website-project](https://coding-web-project-rzepa.herokuapp.com/home/page1)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple website with Express server and MongoDB database, in which user can create an account, change his credentials, delete an accoung or upload forms (CRUD), which contains title, programming language the form is written in, and the acutal body of the form, consisting of lines (heavily inspired by Jupyter Notebook)
	
## Technologies
1. Project is created with:
 * Node version: 15.5.1
2. Following npm libraries:
* validator@13.5.2 (https://www.npmjs.com/package/validator)
* chalk@4.1.0 (https://www.npmjs.com/package/chalk) (as dev dependency)
* nodemon@2.0.7 (https://www.npmjs.com/package/nodemon) (as dev dependency)
* express@4.17.1 (https://www.npmjs.com/package/express)
* hbs@4.1.1 (https://www.npmjs.com/package/hbs)
* express-hbs@2.3.4 (https://www.npmjs.com/search?q=hbs%20express)
* mongodb@3.6.5 (https://www.npmjs.com/package/mongodb)
* mongoose@5.12.1 (https://www.npmjs.com/package/mongoose)
* bcryptjs@2.4.3 (https://www.npmjs.com/package/bcryptjs) 
* jsonwebtoken@8.5.1 (https://www.npmjs.com/package/jsonwebtoken)
* env-cmd@10.10.0 (https://www.npmjs.com/package/env-cmd)
3. To highlight a code syntax I used:
* PrismJS: (https://prismjs.com/)
	
## Setup
To run this project, clone it and run it using scripts defined in package.json:

```
$ git clone https://github.com/piotr-rzepa/coding-website-project
$ npm init
```
From now on, you have two options, either run it using script:

```
$ npm run dev
```
Or using Node.js command:

```
$ node source/app.js
```
