const { Router } = require('express');

const {check} = require('express-validator');
const {validateForm} = require('../middlewares/validate-form');

const { login } = require('../controllers/auth');

const router = Router();
router.post('/login',[
    check("email").isEmail().withMessage("Invalid email"),
    check("password", "The password is mandatory ").notEmpty(),
    validateForm
], login );


module.exports = router;