import React, { Component } from 'react';
import { getAllPress } from '../../actions/pressActions';
import Press from '../components/Press';
import { connect } from 'react-redux';
import {  FormGroup, Col, Input, Row,InputGroup,Button,CardBody,Card,CardHeader,InputGroupAddon,Form } from 'reactstrap';
import { Link } from 'react-router-dom';


 class showPress extends Component {

    state = {
        allPress: [],
        etat: false
      };

      componentWillMount() {
        this.props.getAllPress();
      }

      handleAddRedirect = () => {
        this.props.history.push('/presse/ajouter');
      };

    render()  {
        const { allPress } = this.props.press;
    
        const All = allPress.map((press, index) => (
          <Press key={index} press={press} />
        ));
        return (
          <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Form action="" method="post" className="form-horizontal">
                    <FormGroup row>
                      <Col md="4" sm="4">
                        <InputGroup className="mt-2">
                          <InputGroupAddon addonType="prepend">
                            <Button  type="button" color="primary">
                              Recherche:
                            </Button>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            id="input1-group2"
                            value={this.state.search}
                            name="search"
                            placeholder="Inserer un titre"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                      </Col>
                      <Col md="4" sm="4">
                        <InputGroup className="mt-2">
                          <InputGroupAddon addonType="prepend">
                            <Button  type="button" color="primary">
                              Type:
                            </Button>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            value={this.state.type}
                            name="type"
                            placeholder="Inserer un titre"
                            onChange={this.handleInputChange}
                          >
                            <option value="">veuillez choisir le type</option>
                            <option value="sportif">Sportif</option>
                            <option value="autres">Autres</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      </FormGroup>
                      <FormGroup row >
                      <Col md="4" sm="4">
                        <InputGroup className="mt-2">
                          <Button block onClick={this.handleAddRedirect} color="success" outline>
                            <i className="fa fa-plus" />
                            &nbsp;Ajouter un Evenement
                          </Button>
                        </InputGroup>
                      </Col>
                      <Col md="4" sm="4">
                        <InputGroup className="mt-2">
                          <Button onClick={this.handleArchivedEventsButton} block color="danger" outline>
                            <i className="fa fa-plus" />
                            &nbsp;Evenements Archiveés
                          </Button>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardHeader>
                <CardBody>
                  <Row>
                    {this.props.loading
                      ? 'Loading...'
                      : allPress.map((press, index) => <Press key={index} press={press} />)}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
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
  
