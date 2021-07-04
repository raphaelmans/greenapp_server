const express = require('express');
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controllers/users');


const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(User, 'Users'), getUsers)
  .post(createUser);//Note: removed protect middleware for testing

router
  .route('/:id')
  .get(getUser)
  .put( updateUser)//Note: removed protect middleware for testing
  .delete( deleteUser);//Note: removed protect middleware for testing



module.exports = router;
