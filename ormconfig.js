import('dotenv/config');

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [process.env.DB_ENTITIES_LOCATION],
  migrations: [process.env.DB_MIGRATIONS_LOCATION],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
