# Library REST API

API Documentation can be found in this [Postman collection](https://documenter.getpostman.com/view/763923/SWE56yeD?version=latest)

## Node version

Use [nvm](https://github.com/nvm-sh/nvm) to handle different node versions, for this project `v12.3.1` is used.

```txt
nvm install v12.3.1
nvm use v12.3.1
```

## Installation

```bash
npm install
```

## Run tests

```bash
npm test
```

## Environment Variables

Create a `.env` file in the root of the project with the following:

```txt
NODE_ENV = "development"
# NODE_ENV = "test"
PORT = 3001
MONGO_URI = "mongodb://localhost:27017/library-rest-api"
```

## MongoDB database

```bash
sudo docker pull mongo:latest
sudo docker run -d -p 27017:27017 --name mongodb mongo:latest
```

```bash
sudo docker exec -it mongodb bash
mongo
```

Create the database:

```bash
use library-rest-api
```

Create collection

```js
db.books.insertMany([
  {
    title: 'Flow',
    author: 'Mihaly Csikszentmihalyi',
    genre: 'Self Help Book',
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    genre: 'Business',
  },
  {
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    genre: 'Psychology',
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen Covey',
    genre: 'Self Help Book',
  },
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    genre: 'Self Help Book',
  },
]);
```

## Run the app locally

It will start the app locally using nodemon:

```bash
npm start
```
