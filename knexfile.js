// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      user: process.env.SQL_USERNAME,
      pass: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    }
  },

  production: {
    client: 'pg',
    connection: {
      user: process.env.SQL_USERNAME,
      pass: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    }
  }

};
