import React from 'react';
import './App.css';
import Timer from './pages/Timer/Timer';
import Report from './pages/Report/Report';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Login from './pages/Login/Login';
import useToken from './hooks/useToken';

function App() {
	const { token, setToken } = useToken();
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					{!token ? <Redirect to='/login' /> : <Timer />}
				</Route>
				<Route path='/report'>
					<Report />
				</Route>
				<Route path='/login'>
					<Login setToken={setToken} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
