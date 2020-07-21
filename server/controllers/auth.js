const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
	const { idToken } = req.body;

	client
		.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
		.then((response) => {
			const { email_verified, name, email, picture } = response.payload;
			if (email_verified) {
				User.findOne({ email }).exec((err, user) => {
					if (user) {
						if (user.picture !== picture) {
							user.picture = picture;
							user.save((err, data) => {
								if (err) {
									console.log("error on mergigng data", err);
									return res.status(400).json({
										error: "error merging data",
									});
								}
								const token = jwt.sign(
									{ _id: data._id },
									process.env.JWT_SECRET,
									{
										expiresIn: "7d",
									}
								);
								const { _id, email, name, role, picture } = data;
								return res.json({
									token,
									user: { _id, email, name, role, picture },
								});
							});
						} else {
							const token = jwt.sign(
								{ _id: user._id },
								process.env.JWT_SECRET,
								{
									expiresIn: "7d",
								}
							);
							const { _id, email, name, role, picture } = user;

							return res.json({
								token,
								user: { _id, email, name, role, picture },
							});
						}
						//if user is noe exist
					} else {
						let password = email + process.env.JWT_SECRET;
						user = new User({ name, email, password, picture });
						user.save((err, data) => {
							if (err) {
								console.log("error on logging google save", err);
								return res.status(400).json({
									error: "user signup error with google",
								});
							}
							const token = jwt.sign(
								{ _id: data._id },
								process.env.JWT_SECRET,
								{
									expiresIn: "7d",
								}
							);
							const { _id, email, name, role, picture } = data;
							return res.json({
								token,
								user: { _id, email, name, role, picture },
							});
						});
					}
				});
			} else {
				return res.status(400).json({
					error: "google login failed, try again",
				});
			}
		});
};

exports.facebookLogin = (req, res) => {
	console.log(req.body);
	const { userID, accessToken } = req.body;

	const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

	return fetch(url, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			const picture = `http://graph.facebook.com/${response.id}/picture?type=square`;
			const { email, name } = response;

			User.findOne({ email }).exec((err, user) => {
				// if user exist

				if (user) {
					if (user.picture !== picture) {
						user.picture = picture;
						user.save((err, data) => {
							if (err) {
								console.log("error on mergigng data", err);
								return res.status(400).json({
									error: "error merging data",
								});
							}
							const token = jwt.sign(
								{ _id: data._id },
								process.env.JWT_SECRET,
								{
									expiresIn: "7d",
								}
							);
							const { _id, email, name, role, picture } = data;
							return res.json({
								token,
								user: { _id, email, name, role, picture },
							});
						});
					} else {
						const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
							expiresIn: "7d",
						});
						const { _id, email, name, role, picture } = user;

						return res.json({
							token,
							user: { _id, email, name, role, picture },
						});
					}
					//if user is noe exist
				} else {
					let password = email + process.env.JWT_SECRET;
					user = new User({ name, email, password, picture });
					user.save((err, data) => {
						if (err) {
							console.log("error on logging facebook save", err);
							return res.status(400).json({
								error: "user signup error with facebook",
							});
						}
						const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
							expiresIn: "7d",
						});
						const { _id, email, name, role, picture } = data;
						return res.json({
							token,
							user: { _id, email, name, role, picture },
						});
					});
				}
			});
		});
};
