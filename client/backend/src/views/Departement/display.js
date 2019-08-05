import React, { Component } from 'react';
import { Card, CardBody, Button, Row, Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
export default class display extends Component {
	state = {
		modal: false,
		deps: [],
		selected: {},
		index: '',
		news: []
	};
	componentDidMount() {
		axios.get('http://localhost:3000/dep/').then((data) => {
			this.setState({ deps: data.data });
		});
	}
	search = (e) => {
		var news = [];
		this.state.news.map((i) => {
			console.log(e.target.value);
			console.log(i.title);
			if (i.title.includes(e.target.value)) {
				news.push(i);
			}
		});
		console.log(news);
		this.setState({ news: news });
	};
	detail = (i, e) => {
		this.props.history.push('/departement/detail/' + i);
	};
	update = (i, e) => {
		this.props.history.push('/departement/update/' + i);
	};
	ondelete = async () => {
		await axios.get('http://localhost:3000/dep/del/' + this.state.selected._id);
		this.setState({ news: this.state.news.splice(this.state.index, 1) });
	};
	toggle = (e, i) => {
		this.setState({
			modal: !this.state.modal,
			selected: e,
			index: i
		});
	};
	render() {
		return (
			<Row>
				{this.state.deps.map((e, i) => (
					<Col key={i}>
						<div className="card" style={{ width: '18rem' }}>
							<div align="center">
								<img
									align="center"
									src={'http://localhost:3000/uploads/' + e.image}
									style={{
										verticalAlign: 'middle',
										width: '100px',
										height: '100px',
										borderRadius: '50%'
									}}
									alt="image Chef departement "
								/>
							</div>
							<div className="card-body">
								<h5 align="center" className="card-title">
									{e.nom} {e.prenom}{' '}
								</h5>
								<p className="card-text">{e.departement}</p>
								<Button
									onClick={this.detail.bind(this, e._id)}
									size="sm"
									className="btn-pill"
									color="primary"
								>
									Detail
								</Button>
								<Button
									onClick={this.update.bind(this, e._id)}
									size="sm"
									className="btn-pill"
									color="warning"
								>
									Update
								</Button>
								<Button
									onClick={this.toggle.bind(this, e, i)}
									size="sm"
									className="btn-pill"
									color="danger"
								>
									Delete
								</Button>
							</div>
						</div>
					</Col>
				))}
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={'modal-danger ' + this.props.className}
				>
					<ModalHeader toggle={this.toggle}>Supprimer ? </ModalHeader>
					<ModalBody>
						Vous Voulez supprimer le Departement{' '}
						<b style={{ color: 'red' }}>
							{this.state.selected.nom} {this.state.selected.prenom}{' '}
						</b>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.ondelete}>
							Delete
						</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Row>
		);
	}
}
