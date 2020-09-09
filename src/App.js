import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd';

import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';



const { Header } = Layout;



function App() {
const [auth, setAuth] = useState(false);


const login = (history) => {
  setAuth(true)
  history.push("/")
}

const logout = (history) => {
  setAuth(false)
}

  return (
    <div className="App">
      <Router>

        <Layout>
          <Header>
            <Row justify="space-between" >
              <Col sm={4} xs={10}>
                <Link to="/">
                  <h2 className="logo">Agro Fix</h2>
                </Link> 
              </Col>

              <Col sm={4} xs={10}>
                
                {
                  auth?
                  (
                    <Menu theme="dark" mode="horizontal" >
                      <Menu.Item >
                        <Link to="" onClick={logout} >Logout</Link>
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
          <Route path='/login'  render={ () => <Login login={login} /> } exact />
          <Route path='/register'  render={(props) => <Register {...props} /> } exact />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
