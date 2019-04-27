import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup } from 'react-bootstrap';
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
    const auth_token = 'Bearer BQBnVyReZ_B7L1LrOsjFm9Lob2HHsIx72IA9EmSJV91_2Me_2Q_fbAbnXDfL9gw-R1xk0CbO5n6FuF8tMApwwVvArW_B6jFQbLaSnilpERY_zIgIL0DQbWgstnL-DAd_x_1m8ChvcRV_B3FY';
    
    let playlist = [];

    let response = await axios.get( FETCH_URL, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': auth_token,
      },
      mode: 'cors',
      cache: 'default'
    })
    
    let data = await response.data.playlists.items;

    console.log(response);

    for(let i= 0; i < data.length; i++){

      if (data[i].images[0]) {

        let findPlaylist = await axios.get ( PLAYLIST_URL + data[i].id, {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': auth_token,
          },
          mode: 'cors',
          cache: 'default'
        })

        playlist.push( {
          id: data[i].id,
          uri: data[i].uri,
          link: data[i].external_urls.spotify,
          imgUrl: data[i].images[0].url,
          playListName: data[i].name,
          owner: data[i].owner.display_name,
          followers: findPlaylist.data.followers.total,
          totalTracks: data[i].tracks.total
        });
      }
    }    
    this.setState( { 
      loading: false,
      playlists: playlist 
    } )    
  };

  render() {
    if(this.state.loading) {
      return (
        <div className="App-spinner">
          <h1>Loading...</h1>
          <i className="fas fa-8x fa-spinner fa-spin"></i>
        </div>
      )
    }
    let sortedPlaylists = this.state.playlists.sort((a,b) => a.followers - b.followers).reverse();
    console.log(sortedPlaylists);
    return (
      <div className="App">
        <FormGroup>
          <InputGroup>
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
        <div>
          {this.state.playlists.map( p => (
              <Playlist
                key={p.id}
                name={p.playListName}
                img={p.imgUrl}
                link={p.link}
                owner={p.owner}
                tracks={p.totalTracks}
                followers={p.followers}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
