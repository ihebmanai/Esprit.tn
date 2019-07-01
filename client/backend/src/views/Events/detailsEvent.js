import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Badge, Col, Row } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';



export default class detailsEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          event : {} , 
          dateDebutString : null
        };
        
        
        
      }

      

      componentDidMount() {
        console.log('recuperation du details du Evenement'+this.props.match.params.id)
        axios.get('http://localhost:3000/event/id/'+this.props.match.params.id).then((response)=>{
           this.setState({
             event : response.data
           })
           console.log(this.state.event.image)
          });

          
    
        }

      
    
    render() {
     
    
        return (
           
            <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Evénement : Image</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/carousel/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <img  src={`http://localhost:3000/${this.state.event.image}`} height='300px' width='480px' alt='image' />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" xl="6">
            <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i> Evénement <small>Détails</small>
                <div className="card-header-actions">
                  <Badge>Etat</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div id="exampleAccordion" data-children=".item">
                  <div className="item">
                   
                     <h5>  Titre :</h5>
                   
                  
                      <p className="mb-3">
                       {this.state.event.title}
                      </p> 
                   
                  </div>
                  <div className="item">
                    
                     <h5>Date Enregistrement :</h5> 
                    
                    
                      <p className="mb-3">
                        {this.state.event.date}
                      </p>
                   
                  </div>
                  <div className="item">
                    
                      <h5> Date Debut - Date Fin :</h5>
                    
                    
                      <p className="mb-3">
                        Du {moment(this.state.event.dateDebut).format("MMM Do YY") } Jusqu'a {moment(this.state.event.dateFin).format("MMM Do YY")}
                      </p>
                   
                  </div>
                  <div className="item">
                   
                  <h5>Description :</h5> 
                
               
                   <p className="mb-3">
                     {this.state.event.description}
                   </p>
                
               </div>
               <div className="item">
                   
                   <h5>Url :</h5> 
                
               
                   <p className="mb-3">
                     {this.state.event.url}
                   </p>
                
               </div>
              
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
        )
    }
}
