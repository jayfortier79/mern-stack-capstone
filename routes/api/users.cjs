const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users.cjs');

// const ctrl = (req, res) => {

// }

// router.get("/blah", ctrl)

// /api/users
// appends this path to the app.use path in the server
router.post('/', usersCtrl.create);

// /api/users/login
router.post('/login', usersCtrl.login);


module.exports = router;