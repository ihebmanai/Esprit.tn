import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import {Card,CardBody,Input,CardHeader,Col,FormGroup,Label,CardFooter,
    Button,FormText,
  } from 'reactstrap';
import { addEvent } from "../../actions/eventActions";
import { connect } from "react-redux";

class addEvents extends Component {

    constructor(props){
        super(props)
        this.state ={
            title:'',
            dateStart: new Date(),
            dateEnd: new Date(),
            description:'',
            type:'',
            image:null,
            selectedFile: null,
            url : ''
        }
    }


    handlerCancel = e => {
        this.setState({
            title:'',
            dateStart: new Date(),
            dateEnd: new Date(),
            description:'',
            type:'',
            image:null,
            selectedFile: null,
            url : ''
        });
      };
    
    onChangeDateDebut = date => {
        this.setState({ 
            dateStart:date 
        })
    }
    onChangeDateFin = date => {
        this.setState({ 
            dateEnd:date 
        })
    }

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


    handleSubmit = (event) => {
    
        const newEvent = new FormData()
        newEvent.append('eventImage', this.state.selectedFile,this.state.selectedFile.name)
        newEvent.append('title', this.state.title)
        newEvent.append('dateStart', this.state.dateStart)
        newEvent.append('dateEnd', this.state.dateEnd)
        newEvent.append('description', this.state.description)
        newEvent.append('type', this.state.type)
        newEvent.append('url', this.state.url)
        newEvent.append('user', this.props.user.id)
        
        console.log('newEvent front', newEvent.get('user'));
        this.props.addEvent(newEvent);
        //this.props.history.push("/events");

      }
      
      
    render() {
        return (
             <Card>
                        <CardHeader>
                                <strong> Evénement : </strong> Ajouter
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
                                        <FormText color="muted">Titre de l'évenement à ajouter</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="date-input">Date Debut : </Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <DatePicker type="date" 
                                        name="dateStart"
                                        onChange={this.onChangeDateDebut}
                                        value={this.state.dateStart}
                                        placeholder="date Debut" 
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="date-input">Date Fin : </Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <DatePicker 
                                        type="date"
                                        name="dateEnd" 
                                        value = {this.state.dateEnd}
                                        onChange={this.onChangeDateFin}
                                        placeholder="date Fin" 
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
                                        placeholder="text..."
                                          />
                                        <FormText color="muted">url de l'evenement à ajouter</FormText>
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
    { addEvent }
  )(addEvents);