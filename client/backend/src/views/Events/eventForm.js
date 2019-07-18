import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Col,
  FormGroup,
  Label,
  CardFooter,
  Button,
  FormText,
  InputGroup,
  Row
} from 'reactstrap';
import { addEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class eventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      description: '',
      type: '',
      imageData: null,
      selectedFile: null,
      url: ''
    };
  }

  handlerCancel = e => {
    this.setState({
      title: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      description: '',
      type: '',
      imageData: null,
      selectedFile: null,
      url: '',
      loaded: false
    });
  };

  onChangeDateDebut = date => {
    this.setState({
      dateStart: date
    });
  };
  onChangeDateFin = date => {
    this.setState({
      dateEnd: date
    });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: true
    });
  };

  handleSubmit = event => {
    const newEvent = new FormData();
    if (this.state.loaded) {
      newEvent.append('imageData', this.state.selectedFile, this.state.selectedFile.name);
    }
    newEvent.append('title', this.state.title);
    newEvent.append('dateStart', this.state.dateStart);
    newEvent.append('dateEnd', this.state.dateEnd);
    newEvent.append('description', this.state.description);
    newEvent.append('type', this.state.type);
    newEvent.append('url', this.state.url);
    newEvent.append('user', this.props.user.id);
    newEvent.append('archived', false);

    this.props.addEvent(newEvent);
    this.props.history.push('/events');
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Card>
            <CardHeader>
              <strong> Evénement : </strong> Ajouter
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="8">
                  <Label htmlFor="text-input">Titre :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    placeholder="Titre..."
                  />
                  <FormText color="muted">Titre de l'évenement à ajouter</FormText>
                </Col>
                <Col md="8">
                  <Label htmlFor="date-input">Date Debut : </Label>
                </Col>
                <Col xs="12" md="9">
                  <DatePicker
                    type="date"
                    name="dateStart"
                    onChange={this.onChangeDateDebut}
                    value={this.state.dateStart}
                    placeholder="date Debut"
                  />
                </Col>
                <Col md="8">
                  <Label htmlFor="date-input">Date Fin : </Label>
                </Col>
                <Col xs="12" md="9">
                  <DatePicker
                    type="date"
                    name="dateEnd"
                    value={this.state.dateEnd}
                    onChange={this.onChangeDateFin}
                    placeholder="date Fin"
                  />
                </Col>
                <Col md="8">
                  <Label htmlFor="textarea-input">description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    placeholder="Description..."
                  />
                </Col>

                <Col md="8">
                  <Label htmlFor="text-input">Type :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleInputChange}
                  >
                    <option value="0">veuillez choisir le type</option>
                    <option value="sportif">Sportif</option>
                    <option value="autres">Autres</option>
                  </Input>
                </Col>
                <Col md="8">
                  <Label htmlFor="text-input">Image :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" name="type" onChange={this.fileSelectedHandler} />
                </Col>
                <Col md="8">
                  <Label htmlFor="text-input">Url :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    name="url"
                    value={this.state.url}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="text..."
                  />
                  <FormText color="muted">url de l'evenement à ajouter</FormText>
                </Col>
              </FormGroup>
              <CardFooter>
                <InputGroup>
                  <Button type="submit" className="m-2" onClick={this.handleSubmit} color="primary">
                    <i className="fa fa-dot-circle-o"></i> Ajouter
                  </Button>
                  <Button type="reset" className="m-2" onClick={this.handlerCancel} color="danger">
                    <i className="fa fa-ban"></i> Annuler
                  </Button>
                </InputGroup>
              </CardFooter>
            </CardBody>
          </Card>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  event: state.event
});

export default withRouter(
  connect(
    mapStateToProps,
    { addEvent }
  )(eventForm)
);