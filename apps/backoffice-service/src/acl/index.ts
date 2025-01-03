import redisClient from "@/configuaration/redis";
import ExtensionAppModel from "@/models/extensionApp.model"
import RedisService from "@/services/redis.service";

export const addProjectConfigToRedis = async () => {
    try {
        const service = new RedisService();
        const configs = await ExtensionAppModel.find().populate({ path: 'project', select: ['key'] });
        service.setProjectConfig(configs);
        console.log("Project Configuaration added to Redis...")
    } catch (error) {
        console.log("ERROR: addConfiguarationToRedis::", error)
    }
}