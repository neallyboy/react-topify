import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Playlist extends Component {

    render() {
        return (
                <Container className="Playlist">
                    <Row className="Playlist-row">
                        <Col className="Playlist-col">                
                            <a href={this.props.link} rel="noopener noreferrer" target="_blank">
                                <img className="Playlist-img" src={this.props.img} alt="" />
                            </a>
                        </Col>
                        <Col className="Playlist-col">
                            Playlist Name: {this.props.name}
                        </Col>
                        <Col className="Playlist-col">
                            Description: {this.props.description}
                        </Col>
                        <Col className="Playlist-col">
                            Owner: {this.props.owner}
                        </Col>
                        <Col className="Playlist-col">
                            Number of Tracks: {this.props.tracks}
                        </Col>
                        <Col className="Playlist-col">
                            Number of Followers: {this.props.followers}
                        </Col>
                    </Row>
                </Container>
        )
    }
}

export default Playlist;