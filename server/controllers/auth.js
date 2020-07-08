const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
	const { name, email, password } = req.body;
	User.findOne({ email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: "email is taken",
			});
		}

		const token = jwt.sign(
			{ name, email, password },
			process.env.JWT_ACCOUNT_ACTIVATION,
			{ expiresIn: "10m" }
		);

		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: `account activation link`,
			html: `
			<h1>please use the following link to activate your account</h1>
			<p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
			<hr/>
			<p>this email containt sensitive informaion</p>
			`,
		};

		sgMail
			.send(emailData)
			.then((sent) => {
				return res.json({
					message: `email has been sent to ${email}, please follow the instruction to activate your account`,
				});
			})
			.catch((err) => console.log(err.response.body));
	});
};

exports.accountActivation = (req, res) => {
	const { token } = req.body;

	if (token) {
		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
			if (err) {
				console.error("jwt verify activation error");
				return res.status(401).json({
					error: "Expired link. Please Sign up again",
				});
			}

			const { name, email, password } = jwt.decode(token);
			const user = new User({ name, email, password });
			user.save((err, user) => {
				if (err) {
					console.log("save user activation to db failed");
					return res.status(401).json({
						error: "Error saving to database. Please signup again",
					});
				}
				return res.json({
					message: "signup success",
				});
			});
		});
	} else {
		return res.json({
			message: "Sign up proccess. Please Sign in",
		});
	}
};

exports.signin = (req, res) => {
	const { email, password } = req.body;

	//check if user exist
	User.findOne({ email }).exec((err, user) => {
		if (err || !user)
			return res
				.status(400)
				.json({ error: "User with that email does not exist. Please sign up" });

		//authenticate
		if (!user.authenticate(password))
			return res
				.status(400)
				.json({ error: "Email and password did not match" });

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		const { _id, name, email, role, picture } = user;
		const userData = { _id, name, email, role, picture };
		return res.json({ token, user: userData });
		jhkjhljkl;
	});
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
});

exports.adminMiddleware = (req, res, next) => {
	User.findById({ _id: req.user._id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}

		if (user.role !== "admin") {
			return res.status(400).json({
				error: "Admin resource. Access denied.",
			});
		}

		req.profile = user;
		next();
	});
};

exports.forgotPassword = (req, res) => {
	const { email } = req.body;

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
			expiresIn: "10m",
		});

		return user.updateOne({ resetPasswordLink: token }, (err, success) => {
			if (err) {
				return res.status(400).json({
					error: "DB error",
				});
			} else {
				const emailData = {
					from: process.env.EMAIL_FROM,
					to: email,
					subject: `Password reset link`,
					html: `
			<h1>please use the following link to reset your passsword</h1>
			<p>${process.env.CLIENT_URL}/password/reset/${token}</p>
			<hr/>
			<p>this email containt sensitive informaion</p>
			`,
				};

				sgMail
					.send(emailData)
					.then((sent) => {
						return res.json({
							message: `email has been sent to ${email}, please follow the instruction to activate your account`,
						});
					})
					.catch((err) => console.log(err.response.body));
			}
		});
	});
};

exports.resetPassword = (req, res) => {
	const { resetPasswordLink, newPassword } = req.body;

	if (resetPasswordLink) {
		jwt.verify(
			resetPasswordLink,
			process.env.JWT_RESET_PASSWORD,
			(err, decoded) => {
				if (err) {
					return res.status(400).json({
						error: "Expired link, try again",
					});
				}

				User.findOne({ resetPasswordLink }, (err, user) => {
					if (err) {
						return res.status(400).json({
							error: "Something went wrong, try again",
						});
					}

					const updatedFields = {
						passsword: newPassword,
						resetPasswordLink: "",
					};

					user = _.extend(user, updatedFields);
					user.save((err, result) => {
						if (err) {
							return res.status(400).json({
								error: "Save to DB Error",
							});
						}

						res.json({ message: "great,log in with new password" });
					});
				});
			}
		);
	}
};
