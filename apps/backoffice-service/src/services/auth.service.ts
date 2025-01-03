import UserModel from "../models/user.model"
import { ILoginPayload } from "../types/auth.types";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthService {

    login = async (_: any, data: { body: ILoginPayload }) => {
        try {
            const { email, password } = data.body;

            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const isValidPassword = await this.validatePassword(user.password, password);
            if (!isValidPassword) {
                throw new Error("Invalid credentials");
            }

            const accessToken = await this.generateToken({ email, userId: user._id });

            if (!accessToken) {
                throw new Error("Something went wrong!")
            }
            return {accessToken: accessToken};

        } catch (error) {
            throw new Error(error)
        }
    }

    async validatePassword(hasPassword: string, password: string) {
        try {
            const isMatch = await bcrypt.compare(password, hasPassword);
            return isMatch;
        } catch (error) {
            return false;
        }
    }

    async generateToken(data: any, exp='3w') {
        try {
            const accessToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: exp});
            return accessToken;
        } catch (error) {
            console.log("ERROR::generateToken:", error)
            return null;
        }
    }

    generateRandomPassword(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    async generateHashPassword(password: string, saltRounds=10): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    }

    decodeToken(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            return decoded
        } catch (error) {
            return null;
        }
    }
}

export default AuthService;