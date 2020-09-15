import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import jwtDecode from "jwt-decode";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Protected from "./components/Protected";


const { Header } = Layout;


function App() {
const [auth, setAuth] = useState(false);

useEffect(() => {
  //Authenticating token
  const token = localStorage.getItem("token");
  if(!token) {
    return setAuth(false)
  };

  //Decodeing token to get expiration date
  try{
    const { exp } = jwtDecode(token);
    const currentDate = Math.round(Date.now() / 1000);

    if(exp < currentDate) {
      return setAuth(false);
    }else {
      return setAuth(true);
    }
    
  }catch(err) {
    setAuth(false);
  }

}, [auth]);



const isLoggedIn = (history) => {
  setAuth(true);
  history.push("/");
};

const isLoggedOut = () => {
  localStorage.removeItem("token");
  setAuth(false);
};

  return (
    <div className="App">
      <Router>

        <Layout>
          <Header>
            <Row >
              <Col flex={1}>
                <Link to="/">
                  <h2 className="logo">Agro Fix</h2>
                </Link> 
              </Col>

              <Col >
                
                {
                  auth?
                  (
                    <Menu theme="dark" mode="horizontal" >
                      <Menu.Item >
                        <Link to="" onClick={ isLoggedOut } >Logout</Link>
                      </Menu.Item>
                    </Menu>
                  )
                  :
                  (
                    <Menu theme="dark" mode="horizontal" >
                      <Menu.Item >
                        <Link to='/login'> Login </Link>
                      </Menu.Item>
      
                      <Menu.Item>
                        <Link to="/register"> Register </Link>
                      </Menu.Item>
                    </Menu>
                  )   
                }
                      
              </Col>
            </Row>
          </Header>
        </Layout>
 
        <Switch>
          <Protected path='/' auth={auth}  Component={ Home } exact />
          <Route 
            path='/login'  
            render={ (props) => auth? <Redirect to="/" /> : <Login { ...props } isloggedin={ isLoggedIn }/> } 
            exact 
          />
          
          <Route 
            path='/register'  
            render={ (props) => auth? <Redirect to="/" /> : <Register { ...props } isloggedin={ isLoggedIn }/> } 
            exact 
          />

        </Switch>

      </Router>
    </div>
  );
}

export default App;
