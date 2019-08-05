import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { editNews, getNews } from '../../actions/newsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default class update extends Component {
	state = {
		title: '',
		description: '',
		image: '',
		categorie: '',
		_id: 0,
		updated: false
	};

	componentDidMount() {
		this.props.getNews(this.props.match.params.id);
	}
	fileChangedHandler = (event) => {
		this.setState({ image: event.target.files[0] });
		this.setState({ updated: true });
	};
	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	};
	onFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('title', this.state.title);
		formData.append('description', this.state.description);
		formData.append('categorie', this.state.categorie);
		this.props.editNews(formData, this.props.match.params.id);
		this.props.hisoty.push('/actualite');
	};
	handleEditorChange = (e) => {
		this.setState({ description: e.target.getContent() });
	};

	render() {
		let { news } = this.props.news;
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Modifier l'actualité {this.state.title} </strong>
					</CardHeader>
					<CardBody>
						<Form action="" method="post">
							<FormGroup>
								<Label htmlFor="nf-email">Titre d'acctualité :</Label>

								<Input
									type="text"
									id="nf-email"
									name="title"
									onChange={this.onInputChange}
									placeholder="Titre d actualité .."
									value={news.title}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Acctualité : </Label>

								<Editor
									apiKey="fm95ksulpgolr07u94yfc86hyhs94fksues1h830o8o6cghj"
									init={{
										/* your other settings */
									}}
									onChange={this.handleEditorChange}
									name="description"
									value={news.description}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Catégorie : </Label>

								<select
									value={news.categorie}
									className="browser-default custom-select"
									type="textarea"
									name="categorie"
									onChange={this.onInputChange}
								>
									<option value="Autre">Autre</option>
									<option value="Sport">Sport</option>
									<option value="Event">Event</option>
								</select>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Images : </Label>

								<Input type="file" name="image" id="image" onChange={this.fileChangedHandler} />
							</FormGroup>
						</Form>
					</CardBody>
					<CardFooter>
						<Button type="button" size="sm" onClick={this.onFormSubmit} color="primary">
							<i className="fa fa-dot-circle-o" /> Ajouter cd .{' '}
						</Button>
						<Button type="reset" size="sm" color="danger">
							<i className="fa fa-ban" /> Reset
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}
}
