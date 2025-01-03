import redisClient from "@/configuaration/redis";


class RedisService {

    private CONFIG_KEY = 'configuaration'

    setProjectConfig (configs: Array<any>)  {
        try {
            configs.forEach((item: any) => {
                const redisKey = `${item.project?.key}-CONTEXT`;
                const fieldKey = `${item.key}`;
                redisClient.hSet(redisKey, fieldKey, JSON.stringify(item.configuaration));
            })
        } catch (error) {
            console.log("ERROR: setProjectConfig::", error)
        }  
    }

    async updateProjectConfig  (config: any, projectKey: string, fieldKey: string) {
        try {
            const redisKey = `${projectKey}-CONTEXT`;
            redisClient.hSet(redisKey, fieldKey, JSON.stringify(config));
        } catch (error) {
            console.log("ERROR: updateProjectConfigs::", error)
        }
    }
}

export default RedisService;