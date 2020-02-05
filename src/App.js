import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import SignupLoginPage from './pages/SignupLoginPage';
import PrivateRoutes from './components/PrivateRoutes';
import SingleQuestionPage from './pages/SingleQuestionPage';
import Questions from './pages/Questions';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import './styles/body.css';

import Navbar from './components/Navbar';

//Context
import UserLoginStateContextProvider from './context/UserLoginState';
import { AuthContext } from "./context/auth";

//Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App(props) {
  const [user, setUser] = useState({});
  const [authTokens, setAuthTokens] = useState();
  
  useEffect(() => {
    // (()=>{async () => {
    //   await axios.get(`https://randomuser.me/api/`)
    //    .then(res => {
    //       const user = res.data.results;
    //       this.setState(user[0]);
    //   })
    // })

      axios.get(`https://randomuser.me/api/`)
        .then(res => {
          const user = res.data.results;
          setUser(user[0]);
        })
  },[])
  // async componentDidMount() {
  //   //  axios.get('').then(function (response) {
  //   //   this.setState = {user:response.data};
  //   //  }.bind(this));
  
  // }
   const setTokens = (data) => {
     localStorage.setItem("userId", JSON.stringify(data));
     setAuthTokens(data);
   }
      return (
          <>
        <UserLoginStateContextProvider>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Navbar />
            <Route>
                <Switch>
                  <Route exact path='/' render={(routeProps) => <Home {...routeProps}/>}/>
                    {/* <Route exact path='/profile' render={(routeProps)=><Profile {...routeProps} user={this.state.user}/>}/> */}
                    <Route exact path='/allquestions' render={(routeProps)=><Questions {...routeProps} user={user}/>}/>
                    <Route exact path='/singlequestion/:slug' render={(routeProps)=><SingleQuestionPage {...routeProps} user={user}/>}/>
                    <Route exact path='/signup-login' render={(routeProps)=><SignupLoginPage {...routeProps} user={user}/>}/>
                    <PrivateRoutes path='/profile' component={Profile}/>/>
                    <Route path='*' exact={true} component={NotFound} />
                  </Switch>
            </Route>
          </AuthContext.Provider>
          </UserLoginStateContextProvider> 
         
          </>
        );
}

export default App;
