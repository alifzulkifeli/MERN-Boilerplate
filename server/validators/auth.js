const { check } = require("express-validator");

exports.userSignupValidator = [
	check("name").not().isEmpty().withMessage("name is required"),
	check("email").isEmail().withMessage("must be a valid email adress"),
	check("password")
		.isLength({ min: 8, max: 20 })
		.withMessage("password must be at least 6 character"),
];

exports.userSigninValidator = [
	check("email").isEmail().withMessage("must be a valid email adress"),
	check("password")
		.isLength({ min: 8, max: 20 })
		.withMessage("password must be at least 6 character"),
];
