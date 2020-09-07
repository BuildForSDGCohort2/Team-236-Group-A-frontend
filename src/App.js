import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd';

import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';




const { Header } = Layout;


function App() {


  return (
    <div className="App">
      <Router>

        <Layout>
          <Header>
            <Row>
              <Col sm={4} xs={12}>
                <Link to="/">
                  <h2 className="logo">Agro Fix</h2>
                </Link> 
              </Col>

              <Col sm={20} xs={12}>
                <Menu theme="dark" mode="horizontal" flex="auto">

                  <Menu.Item >
                    <Link to='/login'> Login </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link to="/register"> Register </Link>
                  </Menu.Item>

                </Menu>
              </Col>
            </Row>
          </Header>
        </Layout>
 
        <Switch>
          <Route path='/'  component={ Home } exact />
          <Route path='/login'  component={ Login } exact />
          <Route path='/register'  component={ Register } exact />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
