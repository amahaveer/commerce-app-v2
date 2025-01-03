import { createClient } from 'redis';

const redisClient = createClient({
  url: `redis://${global.systemConfig.REDIS_HOST}:${global.systemConfig.REDIS_PORT}`,
  password: global.systemConfig.REDIS_PASSWORD,
  database: global.systemConfig.REDIS_DB,
});

redisClient.on('connect', () => console.log('[DEBUG] Redis client connected'));
redisClient.on('error', (err) => console.error('[ERROR] Redis client error:', err));

// Ensure Redis client connects
redisClient.connect().catch(console.error);

export default redisClient;
