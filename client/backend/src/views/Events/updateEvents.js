import React, { Component } from 'react';
import {Card,CardBody,Input,CardHeader,Col,FormGroup,Label,CardFooter,
    Button,FormText,
  } from 'reactstrap';
  import axios from 'axios';
  import DatePicker from 'react-date-picker';

export default class updateEvents extends Component {
    state = {
        event : {} , 
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
        componentDidMount() {
        console.log('recuperation du details du meeting'+this.props.match.params.id)
        axios.get('http://localhost:5000/event/id/'+this.props.match.params.id).then((response)=>{
           this.setState({
             event : response.data,
             title:response.data.title,
            date:new Date(),
            dateDebut: new Date(),
            dateFin: new Date(),
            description:response.data.description,
            type:response.data.type,
            url : response.data.url
           })
           console.log(this.state.event)
          });
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
                                        value = {this.state.title || ''}
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
                                        value = {this.state.description || ''}
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
                                        value = {this.state.type || ''}
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
                                        value = {this.state.url || ''}
                                        onChange={this.handleInputChange}
                                        type="text" 
                                        placeholder="text..."
                                          />
                                        <FormText color="muted">url de l'evenement à ajouter</FormText>
                                    </Col>
                                </FormGroup>
                                <CardFooter>
                                    <center>
                                    <Button type="submit" size="sm" onClick={this.handleSubmit}  color="primary"><i className="fa fa-dot-circle-o"></i> Modifier</Button>
                                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Annuler</Button>
                                    </center>
                                </CardFooter>
                                
                            </CardBody>
                    </Card>
        )
    }
}
