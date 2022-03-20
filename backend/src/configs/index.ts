import databaseConfig from './database.json'
import path from 'path';

interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
  timezone: string;
}
const configs={
  development:{
    server:{
      host:"localhost",
      port:8080
    },
    jwt: {
        privateKey: 'liang'
    },
    database:databaseConfig.development as IDatabaseConfig,
    storage: {
      dir: path.resolve(__dirname, '../attachments'),
      prefix: '/public/attachments'
    }

  },
  test:{
    server:{
      host:"localhost",
      port:8080
    },
    jwt: {
        privateKey: 'liang'
    },
    database:databaseConfig.test as IDatabaseConfig,
    storage: {
      dir: path.resolve(__dirname, '../attachments'),
      prefix: '/public/attachments'
    }
  },
  production:{
    server:{
      host:"localhost",
      port:8080
    },
    jwt: {
        privateKey: 'liang'
    },
    database:databaseConfig.production as IDatabaseConfig,
    storage: {
      dir: path.resolve(__dirname, '../attachments'),
      prefix: '/public/attachments'
    }
  },
};
type configKeys = keyof typeof configs;
const NODE_ENV=process.env.NODE_ENV as configKeys || 'development';

export default configs[NODE_ENV];