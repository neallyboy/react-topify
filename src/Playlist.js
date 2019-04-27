import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
                <h1>Playlist Name: {this.props.name}</h1>
                <a href={this.props.link} rel="noopener noreferrer" target="_blank">
                    <img className="Playlist-img" src={this.props.img} alt="" />
                </a>
                <h2>Owner: {this.props.owner}</h2>
                <h2>Number of Tracks: {this.props.tracks}</h2>
                <h2>Number of Followers: {this.props.followers}</h2>
            </div>
        )
    }
}

export default Playlist;