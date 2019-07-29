import React, { Component } from 'react';
import { Button, ModalBody, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

export default class detail extends Component {
	state = {
		nom: '',
		prenom: '',
		email: '',
		image: '',
		departement: '',
		telephone: '',
		modal: false
	};
	async componentDidMount() {
		console.log(this.props.match.params.id);
		axios.get('http://localhost:3000/dep/getByID/' + this.props.match.params.id).then(async (data) => {
			this.setState({ nom: data.data.nom });
			this.setState({ prenom: data.data.prenom });
			this.setState({ departement: data.data.departement });
			this.setState({ email: data.data.email });
			this.setState({ telephone: data.data.telephone });
			this.setState({ image: 'http://localhost:3000/uploads/' + data.data.image });
			this.setState({ description: data.data.description });
			this.setState({ _id: data.data._id });
		});
	}
	deleteHandler = () => {
		axios
			.get('http://localhost:3000/dep/del/' + this.state._id)
			.then(() => this.props.history.push('/departement'));
	};
	toggle = (e, i) => {
		this.setState({
			modal: !this.state.modal
		});
	};
	updateHandler = () => {
		this.props.history.push('/departement/update/' + this.state._id);
	};
	render() {
		return (
			<div align="center">
				<div align="center" className="card col-12 col-sm-9">
					<div align="center" style={{ color: 'red' }} className="card-header">
						<b>
							{this.state.nom} {this.state.prenom}
						</b>
					</div>
					<div className="card-body">
						<div>
							<img
								src={this.state.image}
								style={{
									verticalAlign: 'middle',
									width: '150px',
									height: '150px',
									borderRadius: '50%'
								}}
								alt="admin@bootstrapmaster.com"
							/>
							<br />
							<h2>
								{this.state.nom} {this.state.prenom}
							</h2>
						</div>

						<br />
						<div align="left">
							<table>
								<tr>
									<td>
										<b>Nom et Prenom : </b>
									</td>
									<td>
										{'   '}
										{this.state.nom} {this.state.prenom}
									</td>
								</tr>
								<tr>
									<td>
										<b>Departement : </b>
									</td>

									<td>
										{' '}
										{'   '} {this.state.departement}
									</td>
								</tr>
								<tr>
									<td>
										<b>Email : </b>
									</td>

									<td>
										{' '}
										{'   '} {this.state.email}
									</td>
								</tr>
								<tr>
									<td>
										<b>telephone : </b>
									</td>

									<td>
										{' '}
										{'   '} {this.state.telephone}
									</td>
								</tr>
							</table>
						</div>
						<div align="center">
							<Button onClick={this.updateHandler} color="primary">
								update
							</Button>{' '}
							<Button onClick={this.toggle} color="danger">
								Delete
							</Button>
						</div>
						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={'modal-danger ' + this.props.className}
						>
							<ModalHeader toggle={this.toggle}>Supprimer ? </ModalHeader>
							<ModalBody>
								Vous Voulez supprimer le Departement{' '}
								<b style={{ color: 'red' }}>
									{this.state.nom} {this.state.prenom}{' '}
								</b>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onClick={this.deleteHandler}>
									Delete
								</Button>{' '}
								<Button color="secondary" onClick={this.toggle}>
									Cancel
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}
