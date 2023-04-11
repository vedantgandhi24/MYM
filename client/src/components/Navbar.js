import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { logout, isAuthenticated, user } = useContext(GlobalContext);

	let navigate = useNavigate();
	const onLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		// <div className='container'>
		// 	<div className='nav-wrapper'>
		// 		{/* <a href='/' className='brand-logo'>
		// 			<i className='material-icons'>restaurant</i> Food App
		// 		</a> */}
		// 		<ul className='right'>
		// 			{isAuthenticated ? (
		// 				<Fragment>
		// 					{/* <li>
		// 						{user && user.role === "admin" && (
		// 							<Link to='/add-restaurant'>
		// 								<i className='material-icons'>add_business</i>
		// 							</Link>
		// 						)}
		// 					</li> */}
		// 					<li className='white-text'>Hello, {user && user.name}</li>
		// 					{/* <li>
		// 						{user && (
		// 							<Link to='/update-user'>
		// 								<i className='material-icons'>account_circle</i>
		// 							</Link>
		// 						)}
		// 					</li> */}
		// 					<li>
		// 						<a onClick={onLogout} href='/login'>
		// 							<i className='material-icons right'></i>Logout
		// 						</a>
		// 					</li>
		// 				</Fragment>
		// 			) : (
		// 				<Fragment>
		// 					<li>
		// 						<Link to='/register'>Register</Link>
		// 					</li>
		// 					<li>
		// 						<Link to='/login'>Login</Link>
		// 					</li>
		// 				</Fragment>
		// 			)}
		// 		</ul>
		// 	</div>
		// </div>

		<div>
			<nav className='navbar navbar-dark bg-primary' width='100%'>
				<div className='container-fluid d-flex justify-content-end '>
					{isAuthenticated ? (
						<Fragment>
							<p className='navbar-brand'>Hello, {user && user.name}</p>
							<p className='navbar-brand'>
								<a onClick={onLogout} href='/login' className='text-white'>
									Logout
								</a>
							</p>
						</Fragment>
					) : (
						<Fragment>
							<a
								className='navbar-brand'
								href='/register'
								// style={path == "/bookings" ? navbarBorder : navbarBasic}
							>
								Register
							</a>
							<a
								className='navbar-brand'
								href='/login'
								// style={path == "/bookings" ? navbarBorder : navbarBasic}
							>
								Login
							</a>
						</Fragment>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
