import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import * as api from "../api/index";

// Initial state
const initialState = {
	user: null,
	current: null,
	isAuthenticated: false,
	error: null,
	iamge: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions

	async function loadUser() {
		// if (localStorage.token) {
		// 	setAuthToken(localStorage.token);
		// }

		// try {
		// 	const res = await axios.get("http://localhost:8000/api/users/getuser");
		// 	dispatch({ type: "USER_LOADED", payload: res.data });
		// } catch (err) {
		// 	dispatch({ type: "AUTH_ERROR" });
		// }

		const localUser = JSON.parse(localStorage.getItem("user_info"));
		// console.log("LAODUSER DATA", localUser);

		if (localUser) {
			dispatch({ type: "USER_LOADED", payload: localUser });
		}
	}

	async function login(loginData) {
		// const config = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// };
		// try {
		// 	const res = await axios.post(
		// 		"http://localhost:8000/api/users/login",
		// 		loginData,
		// 		config
		// 	);

		// 	dispatch({
		// 		type: "LOGIN",
		// 		payload: res.data,
		// 	});
		// 	setAuthToken(res.data.token);
		// } catch (err) {
		// 	dispatch({ type: "LOGIN_FAIL", payload: err.response });
		// }

		try {
			const { data } = await api.signIn(loginData);
			// console.log("LOGIN", data);
			dispatch({ type: "LOGIN", payload: data });
			// navigate("/");
		} catch (err) {
			dispatch({ type: "LOGIN_FAIL", payload: err.response });
		}
	}

	async function googleLog(accessToken, navigate) {
		// const config = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// };
		// try {
		// 	console.log("INSIDE FUNC");
		// 	// const res = await axios.post(
		// 	// 	"http://localhost:8000/api/users/login",
		// 	// 	loginData,
		// 	// 	config
		// 	// );
		// 	const res = await axios.get(
		// 		"http://localhost:8000/api/users/auth/google/callback"
		// 	);
		// 	console.log("HERE IT IS!!", res);
		// 	// dispatch({ type: "USER_LOADED", payload: res.data });

		// 	// dispatch({
		// 	// 	type: "LOGIN",
		// 	// 	payload: res.data,
		// 	// });
		// 	setAuthToken(res.data);
		// } catch (err) {
		// 	dispatch({ type: "LOGIN_FAIL", payload: err.response });
		// }
		try {
			// login user
			const { data } = await api.signInGoogle(accessToken);
			// console.log("LOGIN GOOGLE", data);
			dispatch({ type: "LOGIN", payload: data });
			navigate("/");
		} catch (err) {
			dispatch({ type: "LOGIN_FAIL", payload: err.response });
		}
	}

	async function register(registerData) {
		// const config = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// };
		// try {
		// 	const res = await axios.post(
		// 		"http://localhost:8000/api/users/register",
		// 		registerData,
		// 		config
		// 	);

		// 	dispatch({
		// 		type: "REGISTER",
		// 		payload: res.data,
		// 	});
		// 	setAuthToken(res.data.token);
		// } catch (err) {
		// 	dispatch({ type: "REGISTER_FAIL", payload: err.response });
		// }
		try {
			// signup user
			const { data } = await api.signUp(registerData);
			// console.log("REGISTER", data);
			dispatch({ type: "REGISTER", payload: data });
		} catch (err) {
			dispatch({ type: "REGISTER_FAIL", payload: err.response });
		}
	}

	async function googleRegister(accessToken, navigate) {
		try {
			// signup user
			// console.log("CALLING GOOGLE FUNC");
			const data = await api.signUpGoogle(accessToken);
			// console.log("GOOGLE REGISTER", data);
			dispatch({ type: "GOOGLE_REGISTER", payload: data });
			navigate("/");
		} catch (err) {
			dispatch({ type: "REGISTER_FAIL", payload: err.response });
		}
	}

	async function getImage() {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get("http://localhost:8000/api/users/getimage");
			dispatch({ type: "IMAGE_LOAD", payload: res.data });
		} catch (err) {
			dispatch({ type: "AUTH_ERROR" });
		}
	}

	function logout() {
		return {
			type: "LOGOUT",
		};
	}

	function setCurrent(user) {
		return {
			type: "SET_CURRENT",
			payload: user,
		};
	}

	function clearErrors() {
		return {
			type: "CLEAR_ERRORS",
		};
	}

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				current: state.current,
				error: state.error,
				image: state.image,
				loadUser,
				login,
				register,
				logout,
				setCurrent,
				clearErrors,
				getImage,
				googleLog,
				googleRegister,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
