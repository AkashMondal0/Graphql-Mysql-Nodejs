import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';
import connect_mysql from "./db/db.config"
import { getUser } from './controller/User';

interface MyContext {
  token?: string;
}

const app = express();
const PORT = 3000

app.use(cors())
app.use(express.json());
app.use(helmet());
dotenv.config();

app.get('/', (req, res) => {
  res.send("Server ready")
});

app.get('/test', (req, res) => {
  getUser().then((data) => {
    console.log(data)
    res.json(data)
  })
});

const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const main = async () => {
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  connect_mysql.getConnection().then(() => {
    console.log("Connected to MySQL")
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  }).catch((err) => {
    console.log(err)
  })
}

main();