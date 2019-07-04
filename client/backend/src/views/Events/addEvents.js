import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import {Card,CardBody,Input,CardHeader,Col,FormGroup,Label,CardFooter,
    Button,FormText,
  } from 'reactstrap';
import axios from 'axios';


export default class addEvents extends Component {

    constructor(props){
        super(props)
        this.state ={
            title:'',
            date:new Date(),
            dateDebut: new Date(),
            dateFin: new Date(),
            description:'',
            type:'',
            image:null,
            selectedFile: null,
            url : ''
        }
    }

    
    onChangeDateDebut = date => {
        this.setState({ 
            dateDebut:date 
        })
        console.log('date debut:'+this.state.dateDebut)
    }
    onChangeDateFin = date => {
        this.setState({ 
            dateFin:date 
        })
        console.log('date fin:'+this.state.dateFin)
    }

    handleInputChange = (event) => {
        event.preventDefault() 
      //  console.log(event)
        //console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
          [event.target.name] : event.target.value,
         
        })
      }

      onChangeHandler=event=>{

        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
    
    }


    handleSubmit = (event) => {
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        //console.log('submit');
        const data = new FormData()
        data.append('eventImage', this.state.selectedFile,this.state.selectedFile.name)
        data.append('title', this.state.title)
        data.append('dateDebut', this.state.dateDebut)
        data.append('dateFin', this.state.dateFin)
        data.append('description', this.state.description)
        data.append('type', this.state.type)
        data.append('url', this.state.url)
        
        axios.post('http://localhost:5000/event/add', data,config)
        .then( (response)=> {
          console.log(response);
          if (response.status === 200) {
            
            console.log('Ajout event'+this.state.description);
            this.props.history.push('/events');
          }
          
        
        })
        .catch(function (error) {
          console.log(error);
        });
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
                                        name="dateDebut"
                                        onChange={this.onChangeDateDebut}
                                        value={this.state.dateDebut}
                                        minDate={this.state.dateFin}
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
                                        name="dateFin" 
                                        value = {this.state.dateFin}
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
                                        onChange={this.onChangeHandler}
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
                                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Annuler</Button>
                                    </center>
                                </CardFooter>
                                
                            </CardBody>
                    </Card>
              
        )
    }
}
 