import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { GlobalProvider } from "./context/GlobalState";
import Navbar from "./components/Navbar";

// if (localStorage.token) {
// 	setAuthToken(localStorage.token);
// }

function App() {
	return (
		<GlobalProvider>
			<Router>
				<Navbar />
				<div className='App'>
					{/* <Navbar /> */}
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/register' element={<Register />} />
						<Route exact path='/login' element={<Login />} />
					</Routes>
				</div>
			</Router>
		</GlobalProvider>
	);
}

export default App;
