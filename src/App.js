import React, { Component } from 'react';
import Search from './Search';
import logo from './topify-w.png';
import './App.css';
import {Navbar, Button, Form, Nav} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
        loggedIn: token ? true : false
    }
    this.getHashParams = this.getHashParams.bind(this);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">
        <Navbar className="App-Navbar" bg="light" expand="lg">             
          <Navbar.Brand>Topify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="http://localhost:3000">Home</Nav.Link>
                </Nav>
                <Form inline>
                <Button 
                    variant={this.state.loggedIn === true ? 'success' : 'warning'}
                    onClick={()=> this.getHashParams}
                    href={this.state.loggedIn === true ? 'http://localhost:3000' : 'http://localhost:8888/login'}
                >
                  {this.state.loggedIn === true ? 'Log Out' : 'Login to Spotify'}
                </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        <img className="App-image" src={ logo } alt="" />
        <Search 
          accessToken={spotifyApi.getAccessToken()}
        />
      </div>
    );
  }
}

export default App;
