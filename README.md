# Full blown web app

Handling node versions with nvm https://github.com/nvm-sh/nvm

```txt
nvm install 8.9.4
nvm use 8.9.4

node -v  // 8.9.4
npm -v  // 5.6.0

nvm install --lts  // install the latest
```

The `^` locks the first version ^4.17.1
The `~` locks the first and second version ~4.17.1
If you don't add a character it's a specific version

The npm config file

https://docs.npmjs.com/files/npmrc

Put this in the `~/.npmrc` file:

```txt
progress=false
save=true
save-exact=true
```

## Debugging tools

chalk allow us to easily color parts of a console log.
debug logging: https://www.npmjs.com/package/debug
debug will only log something if you run in debug mode
`DEBUG=* node app.js` to show everything
`DEBUG=app node app.js` to show your app

Morgan to log requests: https://www.npmjs.com/package/morgan
Note: Check this out http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

## Linting

To generate the `.eslintrc.js` install `eslint` and then `./node_modules/eslint/bin/eslint.js --init`.

Styleguide: https://github.com/airbnb/javascript

## MS SQL database with Microsoft Azure

To create the db:

```txt
CREATE TABLE books (id int, title varchar(255), author varchar(255));
```

Insert data:

```txt
INSERT INTO books (id, title, author) VALUES
(1, 'Flow', 'Mihaly Csikszentmihalyi'),
(2, 'Zero to One', 'Peter Thiel'),
(3, 'Outliers', 'Malcolm Gladwell'),
(4, 'The 7 Habits of Highly Effective People', 'Stephen Covey'),
(5, 'The Power of Habit', 'Charles Duhigg'),
```

Altering tables:

```txt
ALTER TABLE books
ADD genre varchar(255)
```

Delete Data:

```txt
DELETE from books WHERE author = 'Alan Watts'
```

Query:

```txt
select * from books
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
    genre: null,
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    genre: null,
  },
  {
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    genre: null,
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen Covey',
    genre: null,
  },
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    genre: null,
  },
]);
```
