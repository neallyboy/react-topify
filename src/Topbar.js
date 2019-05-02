import React, { Component } from 'react';
import {Navbar, Button, Form, Nav} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Topbar extends Component {
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
        return(
            <div>
                <Navbar bg="light" expand="lg">             
                    <Navbar.Brand href="http://localhost:3000">Topify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="http://localhost:3000">Home</Nav.Link>
                        <Nav.Link href="#link">About Us</Nav.Link>
                        </Nav>
                        <Form inline>
                        <Button 
                            variant="outline-success" 
                            onClick={()=> this.getHashParams}
                            href="http://localhost:8888/login"
                        >Login to Spotify</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
            </div>
        )
    }
}

export default Topbar;