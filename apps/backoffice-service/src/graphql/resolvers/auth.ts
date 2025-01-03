import AuthService from "../../services/auth.service";


const service = new AuthService;

const AuthResolver = {

    Query: {
        getusers: service.login    
    },

    Mutation: {
        loginUser: service.login
    }
}

export default AuthResolver;

