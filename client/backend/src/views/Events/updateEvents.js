import React, { Component } from 'react';
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
  Row,
  CardImg
} from 'reactstrap';
import DatePicker from 'react-date-picker';
import { getEvent, editEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class updateEvents extends Component {
  state = {
    title: '',
    date: new Date(),
    dateStart: new Date(),
    dateEnd: new Date(),
    description: '',
    type: 'empty',
    imageData: null,
    url: '',
    selectedFile: null,
    loaded:false
  };

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.event.title,
      dateStart: nextProps.event.dateStart,
      dateEnd: nextProps.event.dateEnd,
      description: nextProps.event.description,
      type: nextProps.event.type,
      url: nextProps.event.url
    });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeDateStart = date => {
    this.setState({
      dateStart: date
    });
  };
  onChangeDateEnd = date => {
    this.setState({
      dateEnd: date
    });
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: true
    });
  };

  handleSubmit = (event) => {
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

    this.props.editEvent(newEvent, this.props.match.params.id);

    this.props.history.push('/events');
  };

  render() {
    const { event } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Evénement : Image</strong>
              </CardHeader>
              <CardBody>
                <CardImg src={`http://localhost:4000/${event.image}`} alt={event.image} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <strong> Evénement : </strong> Modifer
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
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
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Date Debut : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <DatePicker
                      name="dateStart"
                      onChange={this.onChangeDateStart}
                      value={this.state.dateStart}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Date Fin : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <DatePicker
                      name="dateEnd"
                      value={this.state.dateEnd}
                      onChange={this.onChangeDateEnd}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
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
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Type :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleInputChange}
                    >
                      <option disabled value="empty">
                        veuillez choisir le type
                      </option>
                      <option value="sportif">Sportif</option>
                      <option value="autres">Autres</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Image :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="file" name="type" onChange={this.fileSelectedHandler} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
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
                  <center>
                    <Button type="submit" block onClick={this.handleSubmit} color="primary">
                      <i className="fa fa-dot-circle-o"></i> Modifier
                    </Button>
                    <Button type="reset" block color="danger">
                      <i className="fa fa-ban"></i> Annuler
                    </Button>
                  </center>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.event,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { getEvent, editEvent }
  )(updateEvents)
);
