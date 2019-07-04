import React, { Component } from 'react'

import {Card,CardBody,CardImg,CardDeck,Button,Container,FormGroup,Col,Input,FormText,CardTitle,CardSubtitle,CardText,Row
  } from 'reactstrap';

  import {  Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
//import toast from 'toasted-notes' ;
import 'toasted-notes/src/styles.css';
//import { confirmAlert } from 'react-confirm-alert'; // Import


export default class Events extends Component {

  state = {
    events : [] , 
  }

  componentWillMount() {
    console.log('Recuperation des données : events')
    axios.get('http://localhost:5000/event').then((response)=>{
     this.setState({
      events : response.data
     })
     console.log(this.state.events)
    
    });
}

  searshByTitle = (event) => {
    console.log('Searsh By title')
    axios.get('http://localhost:5000/event/searsh?title='+event.target.value).then((response)=>{
     this.setState({
      events : response.data
     })
     console.log(this.state.events)
    
    });
  }

  handleClickDelete(id) {
    console.log('id'+id)
   // console.log(event.target.getAttribute('index'));
    /* confirmAlert({
       title: 'Confirmer pour supprimer',
       message: 'Voulez vous vraiment supprimer cet evenement.',
       buttons: [
         {
           label: 'Oui',
           onClick: () =>{
             axios.delete('http://localhost:5000/event/delete/'+id).then((response)=>{
            this.componentWillMount();
 
            [
           
             'bottom-right'
             
           ].forEach(position => {
             toast.notify("Evenement a été supprimer avec success ", {
               position
             });
           });
        console.log(this.evt)
       });
           }
         },
         {
           label: 'Non',
           onClick: () => alert('Click Non')
         }
       ]
     });
     */
   //  console.log(this.state.date)
   axios.delete('http://localhost:5000/event/delete/'+id).then((response)=>{
     
    axios.get('http://localhost:5000/event').then((response)=>{
      this.setState({
       events : response.data
      })
      console.log(this.state.events)
     
     }); 
    
    });
   }



    render() {
      let events = this.state.events.map((evt) => {
        return (
          <div key = {evt._id.toString()}>
          <Card >
          <CardImg top width="100%" src={`http://localhost:3000/${evt.image}`} alt={evt.image} />
          <CardBody>
            <CardTitle>{evt.title}</CardTitle>
            <CardSubtitle>Du {moment(evt.dateDebut).format("MMM Do YY") } jusqu'à  {moment(evt.dateFin).format("MMM Do YY") } </CardSubtitle>
            <CardText><a href={evt.url}>visiter le site</a>  </CardText>
            <Link className="btn-pill btn btn-success btn-sm" to={`/events/details/${evt._id}`}>see details</Link>
            <Link className="btn-pill btn btn-warning btn-sm" to={`/events/update/${evt._id}`}>update</Link>
            <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(evt._id)}>Delete</Button>
          </CardBody>
        </Card>
        </div>
        )
      })
        return (
            <Container fluid>
            <Link to="/events/ajouter" className="navbar-brand">Create a New Event...</Link>
            <br></br>
              <br></br>

            <FormGroup>
                <Col xs="6" md="3">
                    <Input type="text"  onChange={this.searshByTitle} id="text-input" name="text-input" placeholder="Recherche..." />
                    <FormText color="muted">Titre de l'évenement à rechercher</FormText>
                </Col>
                <center>
            <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickPasse()}> Evénements Passé</Button>  
            <Button color="warning" size="sm" className="btn-pill btn btn-warning btn-sm" onClick={() => this.handleClickPasse()}> Evénements en cours</Button>                       
            <Button color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick={() => this.handleClickFutur()}>Evénements à venir</Button>
              </center>
              </FormGroup>
              <CardDeck>
              <Row> 
      {events}
        </Row>
      
     
    </CardDeck>
    
    </Container>
            
        )
    }
}
