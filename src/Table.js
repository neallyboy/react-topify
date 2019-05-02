//import { millisToMinutesAndSeconds } from './Search';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import './Table.css';
//import axios from 'axios';

class Table extends React.Component {
  constructor(props){
    super(props);
      this.state={
        playPopUp:false,
        playingUrl:'',
        audio:null,
        playing:false,
        buttonText:"Stop Preview"
      };
      // this.followPlaylist = this.followPlaylist.bind(this);
      this.playAudio = this.playAudio.bind(this);
    }

  // async followPlaylist(id){
  //   const BASE_URL = 'https://api.spotify.com/v1/playlists/';
  //   let PUT_URL = BASE_URL + id + 'followers';
  //   const auth_token = 'Bearer BQDfnlLMK4JlE5lckmd-0kzNRwiu1edX5ZmCWn5WRRyX96jG_exWGRAaxSv7bcSjN6KiIpoc3y3KFdEvxxTIJXLatwHPaqYGrYYWKLCZXm1nUA4CnDQorBt6qIDz7L-WTLItUZQjPLpQJLoBM_Rk1gNnOMKehShxXoPR6IS_zNQxgYtA61nmdUxSjmRh-D1Nt-obXHy6EkThzi2qy7WHwif_onA';
    
  //   let response = await axios.put( PUT_URL, {
  //     headers : {
  //       'Content-Type': 'application/json',
  //       'Authorization': auth_token,
  //     },
  //     public: false
  //   })
    
  //   console.log(response)
    
  //   //Get the simplified playlist objects
  //   //let data = await response.data.playlists.items;

  // }
  
  playAudio(previewUrl){
    let audio= new Audio(previewUrl);
    if(!this.state.playing){
        audio.play();
        this.setState({
          playing:true,
          playingUrl:previewUrl,
          audio
        })
      }
      else{
        if(this.state.playingUrl === previewUrl){
          this.state.audio.pause();
          this.setState({
            playing: false
          })
        }
        else{
          this.state.audio.pause();
          audio.play();
          this.setState({
            playing:true,
            playingUrl:previewUrl,
            audio
          })
        }
      }
    }

  render() {
    let data = this.props.data;
    //console.log("data:",data)

    //If no data, hide Result table
    if(!data.length)
        return null;




    return (
      <div className="Table">
        <ReactTable
          data={this.props.data}
          columns={[
                {
                  Header: "Playlist Image",
                    Cell: (row) => {
                        return  <div>
                                  <Card className="Table-card card text-center" style={{ width: "15rem" }}>
                                    <Card.Img variant="top" src={row.original.imgUrl } />
                                    <Card.Body>
                                      <Button
                                        className="Table-button"
                                        block 
                                        variant="primary" 
                                        disabled={(!row.original.previewUrl) ? true : false }
                                        onClick={() => {
                                          this.playAudio(row.original.previewUrl);

                                        }}
                                      >
                                        { (!row.original.previewUrl) ? "No Preview Available" 
                                          : this.state.playing === true & row.original.previewUrl === this.state.playingUrl ? "Stop Preview" 
                                          : "Play Preview" }
                                      </Button>
                                    </Card.Body>
                                  </Card>
                                </div>
                    },
                },
                {
                  Header: "Playlist Name",
                  accessor: "playListName",
                  Cell: e =>  <div>
                                <div><a href={e.original.link} rel="noopener noreferrer" target="_blank">{e.value}</a></div>
                                {/* <br></br>
                                <Button
                                  className="Table-button"
                                  variant="primary" 
                                  onClick={() => { this.followPlaylist(e.original.id)
                                  }}
                                >Follow Playlist
                                </Button> */}
                              </div>,
                  style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: "Owner",
                    accessor: "owner",
                    Cell: e => <a href={e.original.ownerLink} rel="noopener noreferrer" target="_blank">{e.value}</a>
                },
                {
                    Header: "Followers",
                    accessor: "followers"
                },
                {
                  Header: "Total Tracks",
                  accessor: "totalTracks"
                },
                {
                  Header: "Total Duration (Mins)",
                  accessor: "totaltotalPlaylistDuration"
                }
              ]
            }
          defaultSorted={[
            {
              id: "followers",
              desc: true
            }
          ]}
          defaultPageSize={50}
          style={{
            height: "1000px"
          }}
          className="-highlight"
          //className="Table-reactTable -striped -highlight"
          showPagination ={false}
        />
      </div>
    );
  }
}

export default Table;