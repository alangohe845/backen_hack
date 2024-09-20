
const express = require("express");
const User = require("../models/user.js");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/user.js');


router.get('/', getUsers);
router.post("/login", getUser);

router.post("/", createUser);

// update a product
router.put("/:id", updateUser);

// delete a product
router.delete("/:id", deleteUser);




module.exports = router;
