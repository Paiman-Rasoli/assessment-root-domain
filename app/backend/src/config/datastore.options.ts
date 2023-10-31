import { DataSourceOptions } from 'typeorm';

export const dataStoreOptions = (): DataSourceOptions => {
  const stage = process.env.STAGE;

  if (['dev', 'prod'].includes(stage)) {
    process.env.DB_TYPE = 'mysql';
  } else process.env.DB_TYPE = 'sqlite';

  const dbType = process.env.DB_TYPE;

  switch (dbType) {
    case 'postgres':
      return {
        type: dbType,
        schema: process.env.DB_SCHEMA || 'public',
        database: process.env.DB_NAME || 'assessment',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
        synchronize: true,
        entities: [],
      };
    case 'sqlite':
      return {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: false,
      };
    default:
      throw new Error('Invalid database config type: ' + process.env.DB_TYPE);
  }
};
