import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";
import {deleteOffer, buyOffer, getOffers} from "../../actions/offerActions";

class Offer extends Component {
  onDeleteClick = id => {
    this.props.deleteOffer(id);
  };

  buyNow = () => {
    this.props.buyOffer(this.props.contract, this.props.offer, this.props.user);
  };

  render() {
    const {offer} = this.props;

    return (
      <tr>
        <td className="align-middle">
          <Link to={`/users/${offer.from}`}>
            {offer.from.substr(0, 30) + "..."}
          </Link>
        </td>
        <td className="align-middle">{offer.quantity / 1000}</td>
        <td className="align-middle">
          {(offer.quantity / 1000) * offer.unitPrice}
        </td>
        <td className="align-middle">
          {new Date(offer.createdAt).toLocaleString()}
        </td>
        <td className="align-middle">
          {offer.status === "Pending" ? (
            <Badge color="success">{offer.status}</Badge>
          ) : (
            <Badge color="danger">{offer.status}</Badge>
          )}
        </td>
        <td className="align-middle">
          {this.props.user.walletAddress === offer.from ? (
            <Button
              color="danger"
              onClick={()=>this.onDeleteClick(offer._id)}
            >
              <i className="cui-credit-card" />
              &nbsp;Delete Offer
            </Button>
          ) : (
            <Button
              color="danger"
              onClick={this.buyNow}
              outline
              disabled={offer.status === "Passed"}
            >
              <i className="cui-credit-card" />
              &nbsp;Buy Now
            </Button>
          )}
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  contract: state.contract.contract,
  offerConfirmed: state.offer.offer
});

export default connect(
  mapStateToProps,
  {deleteOffer, buyOffer, getOffers}
)(Offer);
