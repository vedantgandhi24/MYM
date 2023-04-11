import axios from "axios";

const setAuthToken = (token) => {
	// console.log("TOKEN------", token);
	if (token) {
		axios.defaults.headers.common["authorization"] = token;
	} else {
		delete axios.defaults.headers.common["authorization"];
	}
};

export default setAuthToken;
