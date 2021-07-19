
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookController = require('../controllers/booksController');
const jwtVerify = require('../access_roles/roles.middleware');
const {permit} = require('../access_roles/auth.roles')


router.post('/signup',userController.CreateUser);
router.post('/login',userController.signIn);

router.post('/books',jwtVerify,permit("Authors"),bookController.Create);
router.put('/books/:id',bookController.Update);
router.delete('/books/:id',bookController.DeleteBooks);


module.exports =router;

    
