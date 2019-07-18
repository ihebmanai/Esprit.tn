import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, CardHeader, Card, CardBody, CardImg, Badge } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import moment from 'moment';
import { deleteEvent, archiveEvent, unarchiveEvent } from '../../actions/eventActions';

class Event extends Component {
  handleDetailsButton = id => {
    this.props.history.push('/events/details/' + id);
  };
  handleDeleteButton = id => {
    this.props.deleteEvent(id);
  };
  handleEditButton = id => {
    this.props.history.push('/events/update/' + id);
  };
  
  onChange = (event) => {
    if (event.archived) this.props.unarchiveEvent(event._id);
    else this.props.archiveEvent(event._id);
  };

  render() {
    const { event } = this.props;
    return (
      <Col xs="12" sm="8" md="4">
        <Card>
          <CardHeader>
            <b>{event.title}</b>
            <Badge color={'warning'} className={'ml-1 mr-1'}>
              {event.type}
            </Badge>
            <div className="card-header-actions">
              <AppSwitch
                className={'float-right mb-0'}
                label
                color={'info'}
                size={'sm'}
                checked={!event.archived}
                onChange={() => this.onChange(event)}
              />
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Du <b>{moment(event.dateStart).format('YYYY-MM-DD')}</b> jusqu'à{' '}
              <b>{moment(event.dateEnd).format('YYYY-MM-DD')}</b>{' '}
            </p>
            <hr className="my-2" />
            <CardImg src={`http://localhost:4000/${event.image}`} alt={event.image} />
            <hr className="my-2" />
            <Button onClick={() => this.handleDetailsButton(event._id)} block color="primary">
              Details
            </Button>
            <Button onClick={() => this.handleEditButton(event._id)} block color="warning">
              Modifier
            </Button>
            <Button onClick={() => this.handleDeleteButton(event._id)} block color="danger">
              Supprimer
            </Button>
          </CardBody>
        </Card>
      </Col>

      // <Card>
      //   <CardImg src={`http://localhost:4000/${event.image}`} alt={event.image} />

      //   <CardBody>
      //     <CardTitle>{event.title}</CardTitle>
      //     <CardSubtitle>
      //       Du {moment(event.dateDebut).format('MMM Do YY')} jusqu'à{' '}
      //       {moment(event.dateFin).format('MMM Do YY')}{' '}
      //     </CardSubtitle>
      //     <CardText>
      //       <a href={event.url}>visiter le site</a>{' '}
      //     </CardText>
      //     <Link className="btn-pill btn btn-success btn-sm" to={`/events/details/${event._id}`}>
      //       see details
      //     </Link>
      //   </CardBody>
      // </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { deleteEvent, archiveEvent, unarchiveEvent }
  )(Event)
);
