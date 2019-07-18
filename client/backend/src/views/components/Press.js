import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText,Button } from 'reactstrap';
import {  Link } from "react-router-dom";
import moment from 'moment';
import { deletePress } from "../../actions/pressActions";


class Press extends Component {

  handleDelete = id => {
    this.props.deletePress(id)
  }
  render() {
    const { press } = this.props;

    return (
      <div key={press.id} style={{ width: '18rem', maxheight: '20rem' }}>
        <Card>
          <CardImg src={`http://localhost:4000/${press.image}`} alt={press.image} />

          <CardBody>
            <CardTitle>{press.title}</CardTitle>
            <CardSubtitle>
              Du {moment(press.dateDebut).format('MMM Do YY')} jusqu'à{' '}
              {moment(press.dateFin).format('MMM Do YY')}{' '}
            </CardSubtitle>
            <CardText>
              <a href={press.url}>visiter le site</a>{' '}
            </CardText>
            <Link className="btn-pill btn btn-success btn-sm" to={`/presse/details/${press._id}`}>
              see details
            </Link>
            <Button color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick={() => this.handleDelete(press._id)}>Supprimer</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { deletePress }
)(Press);
