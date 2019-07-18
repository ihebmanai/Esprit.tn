import React, { Component } from 'react';
import { editPress,getPress } from "../../actions/pressActions";
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

import { connect } from "react-redux";

 class updatePress extends Component {


        state ={
         press : {},
         title : '',
         description : '', 
         type : '',
         image : '',
         url : ''
        }
    

    componentDidMount () {
        this.props.getPress(this.props.match.params.id) 
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.press.press)
        this.setState({
            title : nextProps.press.title,
            description : nextProps.press.description,
            type:nextProps.press.type,
            image:nextProps.press.image,
            url:nextProps.press.url,
        })
    }

    
  handleSubmit = (event) => {
    const newEvent = new FormData();
    if (this.state.loaded) {
      newEvent.append('pressImage', this.state.selectedFile, this.state.selectedFile.name);
    } 
    newEvent.append('title', this.state.title);
    newEvent.append('description', this.state.description);
    newEvent.append('type', this.state.type);
    newEvent.append('url', this.state.url);
    newEvent.append('user', this.props.user.id);

    this.props.editPress(newEvent, this.props.match.params.id);

    this.props.history.push('/presse');
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
    render() {
        const { press } = this.props;
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
                    <CardImg src={`http://localhost:4000/${press.image}`} alt={press.image} />
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
                          value={this.state.title ||''}
                          onChange={this.handleInputChange}
                          placeholder="Titre..."
                        />
                        <FormText color="muted">Titre de l'évenement à ajouter</FormText>
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
                          value={this.state.description ||''}
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
                          value={this.state.type ||''}
                          onChange={this.handleInputChange}
                        >
                          <option disabled value="empty">
                            veuillez choisir le type
                          </option>
                          <option value="0">
                              veuillez choisir le type</option>
                            <option value="rapport">rapport</option>
                            <option value="article">article</option>
                            <option value="brochure">brochure</option>
                            <option value="communique">communique</option>
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
                          value={this.state.url ||''}
                          onChange={this.handleInputChange}
                          type="text"
                          placeholder="text..."
                        />
                        <FormText color="muted">url de l'article presse à ajouter</FormText>
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
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
    press: state.press.press,
  });
  
  export default connect(
    mapStateToProps,
    { getPress,editPress }
  )(updatePress);


