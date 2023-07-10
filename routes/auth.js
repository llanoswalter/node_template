const { Router } = require('express');

const {check} = require('express-validator');
const {validateForm} = require('../middlewares/validate-form');

const { login, googleSingIn } = require('../controllers/auth');

const router = Router();
router.post('/login',[
    check("email").isEmail().withMessage("Invalid email"),
    check("password", "The password is mandatory ").notEmpty(),
    validateForm
], login );
router.post('/google',[
    check("id_token", 'google token is required ').notEmpty(),
    validateForm
], googleSingIn );


module.exports = router;