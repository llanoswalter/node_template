const { Router } = require('express');
const { check } = require('express-validator');

const { validateForm,
    validateJWT,
    adminRole, hasRole } = require('../middlewares');

const { isValidRole, mailExist, userExistById } = require('../helpers/db-validators');
const { getUser,
    postUser,
    putUser,
    deleteUser } = require('../controllers/user');

const router = Router();
router.get('/', getUser);
router.post('/', [
    check('email', 'the email is invalid').isEmail().custom(mailExist),
    check('name', 'name cannot be empty').notEmpty(),
    check('password', 'password must be longer than 6 letters').notEmpty().isLength({ min: 6 }),
    //check('role', 'not allowed role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateForm
], postUser);
router.put('/:id', [
    check("id", "is not a valid id").isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(isValidRole),
    validateForm
], putUser);
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check("id", "is not a valid id").isMongoId(),
    check('id').custom(userExistById),
    validateForm
], deleteUser);

module.exports = router;