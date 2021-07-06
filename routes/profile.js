const express = require('express');
const {
    getProfile
} = require('../controllers/profile');



const router = express.Router();

router.route('/:id').get(getProfile);

module.exports = router;