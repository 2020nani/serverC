require('../bootstrap');
console.log(process.env.NODE_ENV)
module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST ,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage:'./__tests__/database.sqlite',
  ssl:  process.env.SSL_DB || false,
  dialectOptions: {
            ssl:  process.env.SSL_DB || false
        },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};