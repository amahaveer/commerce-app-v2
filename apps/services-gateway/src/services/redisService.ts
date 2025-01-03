import { createClient } from 'redis';

const redisUrl = `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`;
const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('connect', () => console.log('[DEBUG] Redis client connected'));
redisClient.on('error', (err) => console.error('[ERROR] Redis client error:', err));

redisClient.connect().catch(console.error); // Ensure the client connects

export default redisClient;
