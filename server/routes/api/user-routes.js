const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddlewareOld } = require('../../utils/auth');

// put authMiddlewareOld anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddlewareOld, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddlewareOld, getSingleUser);

router.route('/books/:bookId').delete(authMiddlewareOld, deleteBook);

module.exports = router;
