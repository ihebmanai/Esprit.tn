import React, { Component } from 'react'

import {Card,CardBody,CardHeader,Table,PaginationItem,PaginationLink,Pagination,Button,Container,FormGroup,Col,Input,FormText
  } from 'reactstrap';

  import {  Link } from "react-router-dom";


export default class Events extends Component {
    render() {
        return (
            <Container fluid>
            <Link to="/events/ajouter" className="navbar-brand">Create a New Event...</Link>
            <br></br>
              <br></br>

            <FormGroup>
                <Col xs="6" md="3">
                    <Input type="text" id="text-input" name="text-input" placeholder="Recherche..." />
                    <FormText color="muted">Titre de l'évenement à rechercher</FormText>
                </Col>
                <center>
            <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickPasse()}> Evénements Passé</Button>                         
            <Button color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick={() => this.handleClickFutur()}>Evénements à venir</Button>
              </center>
            </FormGroup>
            
            <Card> 
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tous Les Evénments
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Enregistre le</th>
                    <th>Type</th>
                    <th>Url</th>
                    <th><center>Actions</center></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Yiorgos Avraamu</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>
                       <center>
                        <Button color="warning" size="sm" className="btn-pill btn btn-warnin btn-sm" >update</Button>
                        <Button color="info" size="sm" className="btn-pill btn btn-info btn-sm" >details</Button>
                        <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" >Delete</Button>
                        </center>
                    </td>
                  </tr>
                
                 
                  
                  
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
            /</Container>
            
        )
    }
}
