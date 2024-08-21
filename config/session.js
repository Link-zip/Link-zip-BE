import session from "express-session"; 
import RedisStore from "connect-redis";
import { redisClient } from "./redis";

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
});

const sessionMiddleware = session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        domain: '*',
    },
});

export { sessionMiddleware };