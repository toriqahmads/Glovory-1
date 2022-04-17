import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config({ path: `${__dirname}/../../.env` });

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: parseInt(<string>process.env.POSTGRES_DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_PREFIX + '_' + process.env.POSTGRES_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  /* Note : it is unsafe to use synchronize: true for schema synchronization
    on production once you get data in your database. */
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  },
};

export default OrmConfig;
