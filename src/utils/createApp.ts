import { config } from "dotenv";
import express, { Express } from "express";
import routes from "../routes";
import cors from "cors";
import session from "express-session";
import store from "connect-mongo"
import passport from "passport";
import bodyParser from "body-parser"

config();
require('../strategies/discord');

export function createApp(): Express {
  const app = express();
  //Enable parsing middleware for Requests
  app.use(express.json());
  app.use(express.urlencoded());
  //Enable CORS middleware
  app.use(
    cors({
      origin: "http://localhost/3000",
      credentials: true,
    }),
  );

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 24 * 7,
    },
    //uses memory store in the database
     store: store.create({mongoUrl: (`${process.env.MONGO_REDIRECT_URL}`)})
  }));

  //Enable Passport authentication for users
  app.use(passport.initialize());
  app.use(passport.session());

  //access all routes endpoints
  app.use("/api", routes);
  return app;
}
