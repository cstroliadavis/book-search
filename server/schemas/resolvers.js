const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const requiresAuth = (cb) => (...args) => {
  const [ , , { user } ] = args;
  if (user) {
    return cb(...args);
  }
  throw new AuthenticationError('Must log in');
};

exports.Mutation = {
  addUser: async (p, params) => {
    const user = await User.create(params);

    if (!user) {
      throw new Error('Something is wrong!');
    }

    const token = signToken(user);
    return { token, user };
  },

  deleteBook: requiresAuth(
    async (p, { bookId }, { user }) => await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId } } },
      { new: true }
    )
  ),

  login: async (p, { username, email, password }) => {
    const user = await User.findOne({
      $or: [ { username }, { email } ],
    });

    if (!user || !(await user.isCorrectPassword(password))) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);

    return { token, user };
  },

  saveBook: requiresAuth(
    async (p, book, { user }) => await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { savedBooks: book } },
      { new: true, runValidators: true },
    )
  ),
};

exports.Query = {
  me: async (p, d, { user }) => {
    const foundUser = await User.findOne({
      _id: user._id,
    });

    if (!foundUser) {
      throw new Error('Cannot find a user with this id!');
    }

    return foundUser;
  },
};
