import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import jwtDecode from "jwt-decode";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Protected from "./components/Protected";
import Admin from "./components/Admin";


const { Header } = Layout;


function App() {
const [auth, setAuth] = useState(false);
const [admin, setAdmin] = useState(false);

useEffect(() => {
  //Authenticating token
  const token = localStorage.getItem("token");
  if(!token) {
    return setAuth(false);
  }

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


useEffect(() => {
  //Admin check
  const role = localStorage.getItem("role");
  if(role && role === "ADMIN") {
    return setAdmin(true);
  } else {
    return setAdmin(false);
  }

}, [admin])



const isLoggedIn = (history) => {
  setAuth(true);
  history.push("/");
};

const isLoggedOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setAuth(false);
  setAdmin(false);
};

  return (
    <div className="App">
      <Router>

        <Layout>
          <Header style={{ zIndex: 1, position: "fixed",top: 0, width: "100vw" }} >
            <Row justify="space-between">
              <Col className="nav" >
                <Link to="/">
                  <h2 className="logo">Agro Fix</h2>
                </Link> 
                {
                  admin? 
                  (
                    <Link to="/admin">
                      <h4 className="admin">Admin</h4>
                    </Link> 
                  )
                  :
                  null 
                }
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
          <Protected path='/admin' auth={admin}  Component={ Admin } exact />
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
