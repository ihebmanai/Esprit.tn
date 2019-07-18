import React, { Component } from 'react';
import {Card,CardBody,Input,CardHeader,Col,FormGroup,Label,CardFooter,
    Button,FormText,
  } from 'reactstrap';
import { addPress } from "../../actions/pressActions";
import { connect } from "react-redux";

 class addPresses extends Component {

    constructor(props){
        super(props)
        this.state ={
            title:'',
            description:'',
            type:'',
            image:null,
            selectedFile: null,
            url : ''
        }
    }

    handleSubmit = (event) => {
    
        const newArticle = new FormData()
        newArticle.append('pressImage', this.state.selectedFile,this.state.selectedFile.name)
        newArticle.append('title', this.state.title)
        newArticle.append('description', this.state.description)
        newArticle.append('type', this.state.type)
        newArticle.append('url', this.state.url)
        newArticle.append('user', this.props.user.id)
        
        console.log('new Press Article front', newArticle.get('user'));
        this.props.addPress(newArticle);
        //this.props.history.push("/events");

      }

    handlerCancel = e => {
        this.setState({
            title:'',
            description:'',
            type:'',
            image:null,
            selectedFile: null,
            url : ''
        });
      };

    handleInputChange = (event) => {
        this.setState({
          [event.target.name] : event.target.value,
        })
      }

      fileSelectedHandler= event => {

        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
    
    }
    render() {
        return (
            <Card>
                        <CardHeader>
                                <strong> Presse : </strong> Ajouter
                        </CardHeader>
                            <CardBody>
                                
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Titre :</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" 
                                        name="title"
                                        value = {this.state.title}
                                        onChange={this.handleInputChange}  
                                        placeholder="Titre..." 
                                        />
                                        <FormText color="muted">Titre de l'article à ajouter</FormText>
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
                                        value = {this.state.description}
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
                                        <Input type="select" 
                                        name="type"  
                                        value = {this.state.type}
                                        onChange={this.handleInputChange}
                                        >
                                            <option value="0">veuillez choisir le type</option>
                                            <option value="rapport">rapport</option>
                                            <option value="article">article</option>
                                            <option value="brochure">brochure</option>
                                            <option value="communique">communique</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">File :</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input 
                                        type="file" 
                                        name="type"  
                                        onChange={this.fileSelectedHandler}
                                         />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Url :</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input 
                                        name="url"  
                                        value = {this.state.url}
                                        onChange={this.handleInputChange}
                                        type="text" 
                                        placeholder="url..."
                                          />
                                        <FormText color="muted">url de l'article à ajouter</FormText>
                                    </Col>
                                </FormGroup>
                                <CardFooter>
                                    <center>
                                    <Button type="submit" size="sm" onClick={this.handleSubmit}  color="primary"><i className="fa fa-dot-circle-o"></i> Ajouter</Button>
                                    <Button type="reset" size="sm" onClick={this.handlerCancel} color="danger"><i className="fa fa-ban"></i> Annuler</Button>
                                    </center>
                                </CardFooter>
                                
                            </CardBody>
                    </Card>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
    event: state.event,
  });
  
  export default connect(
    mapStateToProps,
    { addPress }
  )(addPresses);
