import 'reflect-metadata';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';
import path from 'path';
import { Updoot } from './entities/Updoot';
import { createUserLoader } from './utils/createUserLoader';

const main = async () => {
  // const conn =
  await createConnection({
    type: 'postgres',
    database: 'redist2',
    username: 'postgres',
    password: '@piyuspandey021',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Post, User, Updoot],
  });
  //? running migrations
  // await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 356 * 10, // 10 years
        httpOnly: true,
      },
      saveUninitialized: false,
      secret: 'zephyrus',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = 4000;

  app.get('/', (_, res) => {
    res.send('Hello Bitch');
  });
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};

main();

//!: 6:40
