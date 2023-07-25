import { DataSource } from "typeorm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST as string,
    port: parseInt(process.env.PG_PORT as string, 10),
    database: process.env.PG_DATABASE as string,
    username: process.env.PG_USERNAME as string,
    password: process.env.PG_PASSWORD as string,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    synchronize: Boolean(process.env.PG_SYNCHRONIZE),
    ssl: Boolean(process.env.PG_SSL),
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
});

AppDataSource.initialize();