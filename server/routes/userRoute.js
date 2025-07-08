const express = require('express');
const { createUsers, getUsers, deleteUser, updateUser } = require('../controllers/user');


const router = express.Router()

router.post('/add',createUsers)
router.get('/',getUsers)
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


module.exports = router;