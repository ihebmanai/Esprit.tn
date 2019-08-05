import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import { addNews } from '../../actions/newsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class add extends Component {
	state = {
		title: '',
		description: '',
		image: ''
	};
	fileChangedHandler = (event) => {
		this.setState({ image: event.target.files[0] });
	};
	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('title', this.state.title);
		formData.append('description', this.state.description);
		formData.append('categorie', this.state.categorie);
		this.props.addNews(formData);
		this.props.history.push('/actualite');
	};
	handleEditorChange = (e) => {
		this.setState({ description: e.target.getContent() });
	};

	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Ajouter une nouvelle actualité </strong>
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
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Catégorie : </Label>

								<select
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
const mapStateToProps = (state) => ({
	user: state.auth.user,
	errors: state.errors,
	news: state.news
});

export default withRouter(connect(mapStateToProps, { addNews })(add));
