import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { getAllNews, deleteNews } from '../../actions/newsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			news: [],
			selected: {},
			index: 0
		};
	}
	componentDidMount() {
		this.setState({ news: this.props.getAllNews() });
		console.log(this.state.news);
	}
	search = (e) => {
		if (!e.target.value)
			axios.get('http://localhost:4000/news/getall').then((data) => {
				this.setState({ news: data.data });
			});
		else
			axios.get('http://localhost:4000/news/search/' + e.target.value).then((data) => {
				this.setState({ news: data.data });
			});
	};
	detail = (i, e) => {
		this.props.history.push('/news/detail/' + i);
	};
	update = (i, e) => {
		this.props.history.push('/news/update/' + i);
	};
	ondelete = async () => {
		await axios.get('http://localhost:3000/news/del/' + this.state.selected._id);

		var ok = this.state.news;
		ok.splice(this.state.index, 1);
		this.setState({ news: ok });
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
			<div>
				<Card>
					<CardHeader>
						<i className="fa fa-align-justify" /> Simple Table
					</CardHeader>

					<CardBody>
						<label>Recherche</label>
						<input onChange={this.search} type="text" id="search" />
						<Table responsive>
							<thead>
								<tr>
									<th>Categorie</th>
									<th>Titre</th>
									<th>Date d'ajout </th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{this.state.news.map((p, i) => (
									<tr key={i}>
										<td>
											<b>{p.categorie}</b>
										</td>
										<td>{p.title}</td>
										<td>{p.date}</td>
										<td>
											<Button
												onClick={this.detail.bind(this, p._id)}
												size="sm"
												className="btn-pill"
												color="primary"
											>
												Detail
											</Button>
											<Button
												onClick={this.update.bind(this, p._id)}
												size="sm"
												className="btn-pill"
												color="warning"
											>
												Update
											</Button>
											<Button
												onClick={this.toggle.bind(this, p, i)}
												size="sm"
												className="btn-pill"
												color="danger"
											>
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={'modal-danger ' + this.props.className}
				>
					<ModalHeader toggle={this.toggle}>Supprimer ? </ModalHeader>
					<ModalBody>
						Vous Voulez supprimer l'actulaité <b style={{ color: 'red' }}>{this.state.selected.title}</b>
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
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	errors: state.errors,
	news: state.news,
	loading: state.event.loading
});

export default connect(mapStateToProps, { getAllNews })(display);
