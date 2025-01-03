import UserModel from "../models/user.model";
import { eRoles } from "../types/common.types";
import { ICreateUser } from "../types/user.types";
import AuthService from "./auth.service";

class UserService {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	createUser = async (_: any, data: { body: ICreateUser }) => {
		try {
			const { code, password, email } = data.body;

			const user = await UserModel.exists({ email });
			if (user) {
				throw new Error("User already exist");
			}
			// const password = this.authService.generateRandomPassword();
			// const password = "password";
			const hashed = await this.authService.generateHashPassword(password);
			const payload: any = {
				...data.body,
				password: hashed
			}

			return await UserModel.create(payload);
		} catch (error) {
			throw new Error(error);
		}
	}

	getUserProfile = async (_: any, data, context) => {
		try {
			const { userId } = context.user;

			const userData = await UserModel.findOne({ _id: userId });
			delete userData.password;

			return userData;
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default UserService;