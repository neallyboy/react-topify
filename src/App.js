import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Container, Row, Col} from 'react-bootstrap';
import './App.css';
import axios from 'axios';
import Playlist from './Playlist';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      query : '',
      loading : false,
      playlists : []
    }
    this.search = this.search.bind(this);
  }

  async search(){
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + encodeURIComponent(this.state.query) + '&type=playlist&limit=50';
    let PLAYLIST_URL = 'https://api.spotify.com/v1/playlists/'
    const auth_token = 'Bearer BQBGoXeOhFS9YF2-PvbYHbfCuHWAlCG2xq79N-O9UHKN2vF0wn2aNW6itNwL6WcWPp-Ez_wJRTBoZyEAG9Rt_qaVJdFJGgnHhwPG-uv516xPNnKck4GMfhQh40_xzZx6DUQtVyJC8sAjGZp9';
    
    let playlist = [];

    let response = await axios.get( FETCH_URL, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': auth_token,
      },
      mode: 'cors',
      cache: 'default'
    })
    
    //Get the simplified playlist objects
    let data = await response.data.playlists.items;

    //Loop through the data array containing the responses
    for(let i= 0; i < data.length; i++){

      //Skip playlists that have no Playlist image
      if (data[i].images[0]) {

        //Get the full playlist object for each playlist result to get the followers
        let findPlaylist = await axios.get ( PLAYLIST_URL + data[i].id, {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': auth_token,
          },
          mode: 'cors',
          cache: 'default'
        })

        //Collect the needed items and push them in an empty array
        playlist.push( {
          id: data[i].id,
          uri: data[i].uri,
          link: data[i].external_urls.spotify,
          imgUrl: data[i].images[0].url,
          playListName: data[i].name,
          owner: data[i].owner.display_name,
          description: findPlaylist.data.description,
          followers: findPlaylist.data.followers.total,
          totalTracks: data[i].tracks.total
        });
      }
    }

    //Update the loading boolean and playlist object state
    this.setState( { 
      loading: false,
      playlists: playlist 
    } )    
  };

  render() {

    //Add loading spinner (short circuit the render function)
    if(this.state.loading) {
      return (
        <div className="App-spinner">
          <h1>Loading...</h1>
          <i className="fas fa-8x fa-spinner fa-spin"></i>
        </div>
      )
    }
    
    //Sort Playlist result by followers in decsending order
    let sortedPlaylists = this.state.playlists.sort( ( a,b ) => a.followers - b.followers ).reverse();
    console.log(sortedPlaylists);
    return (
      <div className="App">
        <FormGroup className="App-form">
          <InputGroup size="lg">
            <FormControl
                type="text"
                placeholder="Playlist Search"
                value = { this.state.query }
                onChange= { event => { 
                  this.setState( { query: event.target.value } ) 
                  } 
                }
                onKeyPress= { event=> {
                  if( event.key==='Enter' )
                    this.setState( { loading : true }, this.search);
                }}
            />
          </InputGroup>
        </FormGroup>
        <div className="App-list">
          {/* <Container className="Playlist-Title" fluid="true">
            <Row className="Playlist-rowTitle">
                <Col className="Playlist-colTitle">                
                  Playlist Image
                </Col>
                <Col className="Playlist-colTitle">
                    Playlist Name
                </Col>
                <Col className="Playlist-colTitle">
                    Description
                </Col>
                <Col className="Playlist-colTitle">
                    Owner
                </Col>
                <Col className="Playlist-colTitle">
                    Number of Tracks
                </Col>
                <Col className="Playlist-colTitle">
                    Number of Followers
                </Col>
            </Row>
          </Container> */}
          { sortedPlaylists.map( p => (
              <Playlist
                key={p.id}
                name={p.playListName}
                img={p.imgUrl}
                link={p.link}
                owner={p.owner}
                tracks={p.totalTracks}
                followers={p.followers}
                description={p.description}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
