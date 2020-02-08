import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import User from './pages/user/User';

import Navbar from './components/Navbar/Navbar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import themeStyles from './utils/theme';
import AuthRoute from './utils/AuthRoute';

import './App.css';
import axios from 'axios';

const theme = createMuiTheme(themeStyles);

axios.defaults.baseURL =
  'https://europe-west1-pokeroars-a3471.cloudfunctions.net/api';

const token = localStorage.FBidToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/signup' component={SignUp} />
              <Route exact path='/users/:handle' component={User} />
              <Route
                exact
                path='/users/:handle/roar/:roarId'
                component={User}
              />
            </Switch>
          </div>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
