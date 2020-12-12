import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';
import axios from 'axios';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/layout/Navbar';
import './App.css';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6200ea',
      light: '#9d46ff',
      dark: '#0a00b6',
      contrastText: '#fff'
    },
    secondary: {
      main: '#CF000F',
      light: '#C91F37',
      dark: '#DC3023',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const token = localStorage.fBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path='/' component={home} />
                  <AuthRoute path='/login' component={login} />
                  <AuthRoute path='/signup' component={signup} />
                </Switch>
              </div>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </Provider>

    );
  }
}

export default App;
