const validateForm = require('../middlewares/validate-form');
const validateJWT = require('../middlewares/validate-jws');
const validateRole = require('../middlewares/validate-role');

module.exports = {
    ...validateForm,
    ...validateJWT,
    ...validateRole
}