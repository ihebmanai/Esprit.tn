import React, { Component } from 'react';

import { getEvents } from '../../actions/eventActions';
import Event from '../components/Event';
import { connect } from 'react-redux';

import { CardDeck, Container, FormGroup, Col, Input, FormText, Row } from 'reactstrap';

import { Link } from 'react-router-dom';
//import toast from 'toasted-notes' ;
import 'toasted-notes/src/styles.css';
//import { confirmAlert } from 'react-confirm-alert'; // Import
import axios from '../../api';

class Events extends Component {
  state = {
    events: [],
    etat: false
  };

  componentWillMount() {
    this.props.getEvents();
  }

  searshByTitle = event => {
    axios.get('/events/search?title=' + event.target.value).then(response => {
      this.setState({
        events: response.data
      });
    });
  };

  handleClickDelete(id) {
    axios.delete('/events/delete/' + id).then(response => {});
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { events } = this.props.event;

    const allEvents = events.map((event, index) => (
      <Event key={index} event={event} />
    ));

    return (
      <Container fluid>
        <Link to="/events/add" className="navbar-brand">
          Create a New Event...
        </Link>
        <br></br>
        <br></br>

        <FormGroup>
          <Col xs="6" md="3">
            <Input
              type="text"
              onChange={this.searshByTitle}
              id="text-input"
              name="text-input"
              placeholder="Recherche..."
              disabled={this.state.etat}
            />
            <FormText color="muted">Titre de l'évenement à rechercher</FormText>
          </Col>
          <br></br>
          <Col xs="6" md="3">
            <Input
              type="select"
              name="type"
              value={this.state.type}
              onChange={this.handleInputChange}
            >
              <option value="non">veuillez choisir le type</option>
              <option value="sportif">Sportif</option>
              <option value="autres">Autres</option>
            </Input>
            <FormText color="muted">recherche a partir du type</FormText>
          </Col>

          <center>
            <Link to="/events/archives" className="navbar-brand">
              Archive
            </Link>
          </center>
        </FormGroup>
        <CardDeck>
          <Row>{this.props.loading ? 'Loading' : allEvents}</Row>
        </CardDeck>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  event: state.event,
  loading: state.event.loading
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Events);
