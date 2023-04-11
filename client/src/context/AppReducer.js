export default (state, action) => {
	switch (action.type) {
		case "USER_LOADED":
			localStorage.setItem("user_info", JSON.stringify(action.payload));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				current: action.payload,
			};
		case "LOGIN":
			console.log("REDUCER INFO", action.payload);
			localStorage.setItem("user_info", JSON.stringify(action.payload));
			// localStorage.setItem("token", action.payload.token);
			return {
				...state,
				user: action.payload.result,
				isAuthenticated: true,
			};
		case "REGISTER":
			console.log("REDUCER INFO", action.payload);
			localStorage.setItem("user_info", JSON.stringify(action.payload));
			// localStorage.setItem("token", action.payload.token);
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: true,
			};
		case "GOOGLE_REGISTER":
			console.log("REDUCER INFO", action.payload.data);
			localStorage.setItem("user_info", JSON.stringify(action.payload.data));
			// localStorage.setItem("token", action.payload.token);
			return {
				...state,
				user: action.payload.data.user,
				isAuthenticated: true,
			};
		case "AUTH_ERROR":
		case "REGISTER_FAIL":
		case "LOGIN_FAIL":
		case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				user: null,
				isAuthenticated: false,
				error: action.payload,
			};
		case "SET_CURRENT":
			return {
				...state,
				current: action.payload,
			};

		case "IMAGE_LOAD":
			return {
				...state,
				image: action.payload,
			};

		case "USER_ERROR":
			console.log(action.payload);
			return {
				...state,
				error: action.payload,
			};
		case "CLEAR_ERRORS":
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
