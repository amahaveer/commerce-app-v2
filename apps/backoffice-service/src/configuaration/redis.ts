import { addProjectConfigToRedis } from '@/acl';
import { createClient } from 'redis';


const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
//   password: global.systemConfig.REDIS_PASSWORD,
//   database: global.systemConfig.REDIS_DB,
});

redisClient.on('connect', () => addProjectConfigToRedis());
redisClient.on('error', (err) => console.error('[ERROR] Redis client error:', err));



export default redisClient;
