import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres', // or whatever DB you're using
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  synchronize: false,
});

AppDataSource.initialize();
