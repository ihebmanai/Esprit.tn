import React, { Component } from 'react';
import { getPress } from "../../actions/pressActions";
import { connect } from "react-redux";
import { Card, CardImg,CardBody, CardHeader, Badge, Col, Row } from 'reactstrap';

 class detailsPress extends Component {

   

    state = {
        title  : 'undefined'
    }

    componentDidMount() {
        this.props.getPress(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.press.press)
        this.setState({
            title : nextProps.press.title
        })
    }
    
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
                    <i className="fa fa-align-justify"></i> Evénement <small>Détails</small>
                    <div className="card-header-actions">
                      <Badge>{press.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div id="exampleAccordion" data-children=".item">
                      <div className="item">
                        <h5> Titre :</h5>
    
                        <p className="mb-3">{press.title}</p>
                      </div>
                      <div className="item">
                        <h5>Date Enregistrement :</h5>
    
                        <p className="mb-3">{press.createdAt}</p>
                      </div>
                      <div className="item">
                        <h5>Description :</h5>
    
                        <p className="mb-3">{press.description}</p>
                      </div>
                      <div className="item">
                        <h5>Url :</h5>
    
                        <p className="mb-3">{press.url}</p>
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

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
    press: state.press.press,
  });
  
  export default connect(
    mapStateToProps,
    { getPress }
  )(detailsPress);
