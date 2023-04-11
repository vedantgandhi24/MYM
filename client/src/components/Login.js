import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
	const { login, isAuthenticated, error, googleRegister } =
		useContext(GlobalContext);

	let navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
		// eslint-disable-next-line
	}, [isAuthenticated, error]);

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const { email, password } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("Email", email);
		console.log("Pass", password);
		login({
			email,
			password,
		});
	};

	const handleGoogleLoginSuccess = (tokenResponse) => {
		const accessToken = tokenResponse.access_token;
		googleRegister(accessToken, navigate);
	};
	const gogLogin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

	return (
		<div className='container d-flex justify-content-center mt-4'>
			<form
				onSubmit={onSubmit}
				className='card bg-white px-3'
				style={{ width: "40%" }}>
				<h1 className='d-flex justify-content-center'>Account Login</h1>
				<div className='row mt-2 mb-2'>
					<div className='col-12'>
						<label htmlFor='email' className='form-label'>
							Email:
						</label>
						<input
							id='email'
							type='email'
							name='email'
							value={email}
							onChange={onChange}
							required
						/>
					</div>
				</div>
				<div className='row mt-2 mb-2'>
					<div className='col-12'>
						<label htmlFor='password' className='form-label'>
							Password:
						</label>
						<input
							id='password'
							type='password'
							name='password'
							value={password}
							onChange={onChange}
							required
							minLength='6'
						/>
					</div>
				</div>

				<div className='d-flex justify-content-center mx-auto mb-4'>
					<button type='submit' className='btn btn-danger me-4'>
						Login
					</button>
					<button
						type='button'
						className='btn btn-primary'
						onClick={() => gogLogin()}>
						Signin with Google
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
