import cookie from "js-cookie";

//set in cookie
export const setCookie = (key, value) => {
	if (window !== "undefined") {
		cookie.set(key, value, {
			expires: 1,
		});
	}
};

//get from cookie
export const removeCookie = (key) => {
	if (window !== "undefined") {
		cookie.remove(key, {
			expires: 1,
		});
	}
};
//remove the cookie

export const getCookie = (key) => {
	if (window !== "undefined") {
		return cookie.get(key);
	}
};

//set in local storage
export const setLocalStorage = (key, value) => {
	if (window !== "undefined") {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

//remove from local storage
export const removeLocalStorage = (key, value) => {
	if (window !== "undefined") {
		localStorage.removeItem(key);
	}
};

//authenticate user by passing data to cookie and local storage
export const authenticate = (response, next) => {
	console.log(response);
	setCookie("token", response.data.token);
	setLocalStorage("user", response.data.user);
	next();
};

// access user from local storage
export const isAuth = () => {
	if (window !== "undefined") {
		const cookieChecked = getCookie("token");
		if (cookieChecked) {
			if (localStorage.getItem("user")) {
				return JSON.parse(localStorage.getItem("user"));
			} else {
				return false;
			}
		}
	}
};

export const signout = (next) => {
	removeCookie("token");
	removeLocalStorage("user");
	next();
};
