const chalk = require('chalk');
const debug = require('debug')('app');

const appFactory = require('./src/app-factory');
const config = require('./src/config');

const mssqlRepository = require('./src/infrastructure/mssql-repository/index');
const memoryRepository = require('./src/infrastructure/memory-repository/index');
const mongoRepository = require('./src/infrastructure/mongo-repository/index');

let db = memoryRepository;
let dbConfig = null;

if (config.app.env === 'development' && config.app.db === 'mssql') {
  db = mssqlRepository;
  dbConfig = config.sql;
}

if (config.app.env === 'development' && config.app.db === 'mongo') {
  db = mongoRepository;
  dbConfig = config.mongo;
}

// We need to pass the dirname here so that static files are served properly
const app = appFactory.createApp(db);

app.listen(config.app.port, async () => {
  try {
    if (config.app.env === 'development') {
      await db.connect(dbConfig);
    }
    debug(`Listening on ${chalk.green(config.app.port)}`);
  } catch (error) {
    debug(error);
  }
});
