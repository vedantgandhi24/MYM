import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { getImage, image, isAuthenticated, loadUser } =
		useContext(GlobalContext);
	let navigate = useNavigate();
	useEffect(() => {
		if (localStorage.token) {
			loadUser();
		}

		if (!isAuthenticated) {
			navigate("/login");
		}

		getImage();

		// eslint-disable-next-line
	}, []);
	return (
		<div className='container'>
			{!image ? (
				<p>No Image to display</p>
			) : (
				<div>
					<h1 className='text-center mt-4'>Astronomy Picture of the Day</h1>
					<p className='text-center mt-3'>{image.explanation}</p>
					<div className='d-flex justify-content-center'>
						<img src={image.url}></img>
					</div>

					<p className='text-center mt-3'>{image.title}</p>
					<p className='text-center mt-3'>Copyright: {image.copyright}</p>
				</div>
			)}
		</div>
	);
};

export default Home;
