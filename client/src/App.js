import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExp from './components/edit-profile/AddExp';
import AddEdu from './components/edit-profile/AddEdu';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import './App.css';

// check if the user is logged in every time the page reload
if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	// is token expired
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// logout
		store.dispatch(logoutUser());

		// clear current profile from state
		store.dispatch(clearCurrentProfile());

		// redirect to login
		window.location.href = 'login';
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<div className='container'>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/profiles' component={Profiles} />
						<Route
							exact
							path='/profile/:handle'
							component={Profile}
						/>
						<Route
							exact
							path='/profile/user/:id'
							component={Profile}
						/>

						<Switch>
							<PrivateRoute
								exact
								path='/dashboard'
								component={Dashboard}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path='/edit-profile'
								component={EditProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExp}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEdu}
							/>
						</Switch>
						<Route exact path='/not-found' component={NotFound} />
						<Switch>
							<PrivateRoute
								exact
								path='/feed'
								component={Posts}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path='/posts/:id'
								component={Post}
							/>
						</Switch>
					</div>

					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
