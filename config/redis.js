import { createClient } from "redis";

const redisClient = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        tls: process.env.NODE_ENV === 'production' ? true : false,
    },
});

redisClient.on('error', (err) => console.error('Redis error: ', err)); // redis 연결 에러처리

export { redisClient };