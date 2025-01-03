import User from '../../models/user.model';
import UserService from '../../services/user.service';

const service = new UserService();

const userResolver = {
  Query: {
    getUserProfile: service.getUserProfile,
  },
  
  Mutation: {
    createUser: service.createUser
  }
};

export default userResolver;