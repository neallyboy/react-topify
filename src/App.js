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
      playlists : []
    }
    this.search = this.search.bind(this);
  }

  async search(){
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + encodeURIComponent(this.state.query) + '&type=playlist&limit=50';
    let PLAYLIST_URL = 'https://api.spotify.com/v1/playlists/'
    //const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    const auth_token = 'Bearer BQBZvDMtCFDT3Mmk3ob9BkrQqwqsfigXEMmVPFwI6BJnktynaPkFwZTHCTcBZtTAHpcldv02Z6KDdMlwwEY5XsTTl-oETsc5JnjwhJb_AI53HrChRiTgG3W4QL2am-dF2iyaKf5SI5Z2eUmv';

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
    for(let i= 0; i < data.length; i++){
      
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
            imgUrl: data[i].images[0].url,
            playListName: data[i].name,
            owner: data[i].owner.display_name,
            totalTracks: data[i].tracks.total,
            followers: findPlaylist.data.followers.total
          } );
    }
    this.setState( { playlists: playlist } )
    
    console.log(data);
    console.log(this.state.playlists[0].uri);
  };

  render() {
    return (
      <div className="App">
        <FormGroup>
          <InputGroup>
            <FormControl
                type="text"
                placeholder="Search Playlist"
                value = { this.state.query }
                onChange= { event => { 
                  this.setState( { query: event.target.value } ) 
                  } 
                }
                onKeyPress= { event=> {
                  if( event.key==='Enter' )
                    this.search();
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
