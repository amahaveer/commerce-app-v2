import { PubSub } from 'graphql-subscriptions';
import DataLoader from 'dataloader';

// const userLoader = new DataLoader(async (userIds) => {
//   const users = await User.find({ _id: { $in: userIds } });
//   return userIds.map(id => users.find(user => user.id === id));
// });

const postResolver = {
  Query: {
  },

  Mutation: {
    createPost: async (_, { title, content }, { token }) => {

    },
  },
};

export default postResolver;