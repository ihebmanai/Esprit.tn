import React, { Component } from 'react';
import {Card,CardBody,Input,CardHeader,Col,FormGroup,Label,CardFooter,
    Button,FormText,
  } from 'reactstrap';

export default class addEvents extends Component {
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
                                        <Input type="text" id="text-input" name="text-input" placeholder="Titre..." />
                                        <FormText color="muted">Titre de l'évenement à ajouter</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="date-input">Date Debut : </Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="date" id="date-input" name="date-input" placeholder="date" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="textarea-input">Textarea</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                                                    placeholder="Description..." />
                                    </Col>
                                </FormGroup>
                                
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Type :</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select" name="select" id="select">
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
                                        <Input type="file" id="file-input" name="file-input" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Url :</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="text-input" name="text-input" placeholder="text..." />
                                        <FormText color="muted">url de l'evenement à ajouter</FormText>
                                    </Col>
                                </FormGroup>
                                <CardFooter>
                                    <center>
                                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Ajouter</Button>
                                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Annuler</Button>
                                    </center>
                                </CardFooter>
                            </CardBody>
                    </Card>
              
        )
    }
}
 