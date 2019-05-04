import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import './Table.css';

class Table extends React.Component {
  constructor(props){
    super(props);
      this.state={
        track:'',
        playPopUp:false,
        playingUrl:'',
        audio:null,
        playing:false,
        buttonText:"Stop Preview"
      };
      this.playAudio = this.playAudio.bind(this);
      this.showPlay = this.showPlay.bind(this);
    }
  
  //Function to use the browser audio player
  playAudio( previewUrl ){
    let audio= new Audio( previewUrl );
    if( !this.state.playing ){
        audio.play();
        this.setState({
          playing:true,
          playingUrl:previewUrl,
          audio
        })
      }
      else{
        if( this.state.playingUrl === previewUrl ){
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

  //Function to display track sample as an overlay
  showPlay(t) {
    this.setState({playPopUp:true, track:t}, ()=>{
      setTimeout(()=> this.setState({playPopUp:false}),1500);
    });
  }


  render() {
    let data = this.props.data;
    //console.log("data:",data)

    //If no data, hide Result table
    if(!data.length)
        return null;

    //Else return Result table
    return (
      <div className="Table">
        <ReactTable
          data={this.props.data}
          columns={[
                {
                  Header: "Playlist Image",
                    Cell: (row) => {
                        return  <div>
                                  <h1 
                                    className={`overlay ${this.state.playPopUp && "show"}`}
                                  >
                                  {this.state.playing === true && this.state.audio ? this.state.track : "Stopped"}
                                  </h1>
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
                                          this.showPlay(row.original.previewTrack);
                                        }}
                                      >
                                        { (!row.original.previewUrl) ? "No Preview Available" 
                                          : this.state.playing === true & row.original.previewUrl === this.state.playingUrl ?  "Stop Preview"
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
                  Cell: e =>  <a href={e.original.link} rel="noopener noreferrer" target="_blank">{e.value}</a>,
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
            // height: "1000px"
          }}
          className="-highlight"
          showPagination ={false}
        />
      </div>
    );
  }
}

export default Table;