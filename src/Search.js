import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import Table from './Table';
import './Search.css';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      query : '',
      loading : false,
      playlists : []
    }
    this.search = this.search.bind(this)
    this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    //var seconds = ((millis % 60000) / 1000).toFixed(0);
    //return (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    return minutes;
  };

  async search(){
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + encodeURIComponent(this.state.query) + '&type=playlist&limit=50';
    let PLAYLIST_URL = 'https://api.spotify.com/v1/playlists/'
    const auth_token = 'Bearer BQD_Tm5xUq67B6FDsGRX7DRfg1Bt6ZxCy-CFVYzjz7ZwlnrxriVtlDwT3xn2MNtTPm8dACiBuPdHq2x6dUNgVAFUDDeaVsgTo7sMQRsBGzJxea6MFnoNvYGO2dZC5lpDxDfeKhcZubhkxKgp';
    
    let playlist = [];

    let response = await axios.get( FETCH_URL, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': auth_token,
      },
      mode: 'cors',
      cache: 'default'
    })
    
    //console.log(response)
    
    //Get the simplified playlist objects
    let data = await response.data.playlists.items;
    
    //console.log(data)
    
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

        console.log("duration_ms:",findPlaylist.data.tracks.items.length, (!findPlaylist.data.tracks.items.track), findPlaylist.data.tracks.items)
        // Get total duration of playlist
        var totalPlaylistDuration = 0;
        for(let x= 0; x < findPlaylist.data.tracks.items.length; x++ ){
          //console.log(x,(!findPlaylist.data.tracks.items[x].track))
          let trackDuration = !findPlaylist.data.tracks.items[x].track ? 0 : findPlaylist.data.tracks.items[x].track.duration_ms;
          totalPlaylistDuration = totalPlaylistDuration + trackDuration;
        }
        
        //console.log("totalPlaylistDuration:", this.millisToMinutesAndSeconds(totalPlaylistDuration))

        //console.log("findPlaylist: ",findPlaylist)

        //Collect the needed items and push them in an empty array
        playlist.push( {
          id: data[i].id,
          uri: data[i].uri,
          link: data[i].external_urls.spotify,
          imgUrl: data[i].images[0].url,
          playListName: data[i].name,
          owner: data[i].owner.display_name,
          ownerLink: data[i].owner.external_urls.spotify,
          description: findPlaylist.data.description.replace(/&amp; /g, ' & ').replace(/&quot; /g, ' " ' ),
          followers: findPlaylist.data.followers.total,
          totalTracks: data[i].tracks.total,
          totaltotalPlaylistDuration: this.millisToMinutesAndSeconds(totalPlaylistDuration),
          previewUrl: findPlaylist.data.tracks.items[0].track.preview_url
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
        <div className="Search-spinner">
          <h1>Loading...</h1>
          <i className="fas fa-8x fa-spinner fa-spin"></i>
        </div>
      )
    }
    
    //Sort Playlist result by followers in decsending order
    //let sortedPlaylists = this.state.playlists.sort( ( a,b ) => a.followers - b.followers ).reverse();
    
    //console.log(sortedPlaylists);
    console.log("playlists: ",this.state.playlists);

    return (
      <div className="Search">
        <FormGroup className="Search-form">
        <Row className="justify-content-md-center">
          <Col sm="6">
            <InputGroup className="Search-input">
              <FormControl
                  size="lg"
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
          </Col>
        </Row>
        </FormGroup>
        <Table data={this.state.playlists} />
      </div>
    );
  }
}

export default Search;
export function millisToMinutesAndSeconds(millis){};
