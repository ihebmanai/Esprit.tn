import React, { Component } from 'react';
import { getAllPress } from '../../actions/pressActions';
import Press from '../components/Press';
import { connect } from 'react-redux';
import { CardDeck, Container, FormGroup, Col, Input, FormText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';


 class showPress extends Component {

    state = {
        allPress: [],
        etat: false
      };

      componentWillMount() {
        this.props.getAllPress();
      }

    render()  {
        const { allPress } = this.props.press;
    
        const All = allPress.map((press, index) => (
          <Press key={index} press={press} />
        ));
        return (
            <Container fluid>
            <Link to="/presse/ajouter" className="navbar-brand">
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
              <Row>{this.props.loading ? 'Loading' : All}</Row>
            </CardDeck>
          </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
    press: state.press,
    loading: state.press.loading
  });
  
  export default connect(
    mapStateToProps,
    { getAllPress }
  )(showPress);
  
