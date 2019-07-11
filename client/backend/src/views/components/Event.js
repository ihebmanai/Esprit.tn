import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import {  Link } from "react-router-dom";
import moment from 'moment';

class Event extends Component {
  render() {
    const { event } = this.props;

    return (
      <div key={event._id.toString()} style={{ width: '18rem', maxheight: '20rem' }}>
        <Card>
          <CardImg src={`http://localhost:4000/${event.image}`} alt={event.image} />

          <CardBody>
            <CardTitle>{event.title}</CardTitle>
            <CardSubtitle>
              Du {moment(event.dateDebut).format('MMM Do YY')} jusqu'à{' '}
              {moment(event.dateFin).format('MMM Do YY')}{' '}
            </CardSubtitle>
            <CardText>
              <a href={event.url}>visiter le site</a>{' '}
            </CardText>
            <Link className="btn-pill btn btn-success btn-sm" to={`/events/details/${event._id}`}>
              see details
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Event);
