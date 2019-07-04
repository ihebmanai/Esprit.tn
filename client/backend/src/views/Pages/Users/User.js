import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import { getProfile } from "../../../actions/authActions";
class User extends Component {


  componentDidMount() {
    if (this.props.web3) {
      this.props.getProfile(this.props.web3, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.web3 !== this.props.web3 || nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getProfile(nextProps.web3, nextProps.match.params.id);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  User Information:
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr key="walet">
                      <td>{`Wallet address :`}</td>
                      <td>
                        <strong>{user.walletAddress}</strong>
                      </td>
                    </tr>
                    <tr key="Idsamrthub">
                      <td>{`SmartHub ID :`}</td>
                      <td>
                        <strong>{user.smartHubId}</strong>
                      </td>
                    </tr>
                    <tr key="username">
                      <td>{`Username :`}</td>
                      <td>
                        <strong>{user.username}</strong>
                      </td>
                    </tr>
                    <tr key="email">
                      <td>{`Email :`}</td>
                      <td>
                        <strong>{user.email}</strong>
                      </td>
                    </tr>
                    <tr key="registeredAt">
                      <td>{`Registered At :`}</td>
                      <td>
                        <strong>{user.createdAt}</strong>
                      </td>
                    </tr>
                    <tr key="bal">
                      <td>{`Balance  :`}</td>
                      <td>
                        <strong>{user.balance} Ether</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.contract.account,
  web3: state.contract.web3,
  user:state.auth.profile,
});

export default connect(
  mapStateToProps,
  {getProfile}
)(User);