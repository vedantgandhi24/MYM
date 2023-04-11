import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
	const { register, isAuthenticated, googleRegister } =
		useContext(GlobalContext);

	let navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}

		// eslint-disable-next-line
	}, [isAuthenticated]);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("Name", name);
		console.log("Email", email);
		console.log("Pass", password);

		register({ name, email, password });
	};

	const handleGoogleLoginSuccess = (tokenResponse) => {
		const accessToken = tokenResponse.access_token;
		googleRegister(accessToken, navigate);
	};
	const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

	return (
		<div className='container d-flex justify-content-center mt-4'>
			<form className='card bg-white px-3' style={{ width: "40%" }}>
				<h1 className='d-flex justify-content-center'>Account Register</h1>
				<div className='row mt-2 mb-2'>
					<div className='col-12'>
						<label htmlFor='name' className='form-label'>
							Name:
						</label>
						<input
							id='name'
							type='text'
							name='name'
							value={name}
							onChange={onChange}
							required
						/>
					</div>
				</div>
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
							minLength='6'
						/>
					</div>
				</div>

				<div className='d-flex justify-content-center mx-auto mb-4'>
					<button className='btn btn-danger me-4' onClick={onSubmit}>
						Register
					</button>
					<button className='btn btn-primary' onClick={() => login()}>
						Signup with Google
					</button>
				</div>
			</form>

			<div></div>
		</div>
	);
};

export default Register;
