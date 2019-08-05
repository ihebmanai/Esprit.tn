import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import axios from 'axios';
export default class display extends Component {
	state = {
		img: 'user.png',
		image: '',
		nom: '',
		prenom: '',
		telephone: '',
		email: '',
		departement: ''
	};
	fileChangedHandler = (event) => {
		this.setState({ image: event.target.files[0] });
		const formData = new FormData();
		formData.append('image', event.target.files[0]);
		axios.post('http://localhost:3000/dep/upload', formData).then((data) => {
			this.setState({ img: data.data });
		});
	};
	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('departement', this.state.departement);
		formData.append('telephone', this.state.telephone);
		formData.append('email', this.state.email);
		formData.append('nom', this.state.nom);
		formData.append('prenom', this.state.prenom);
		formData.append('img', this.state.img);

		axios.post('http://localhost:3000/dep/add', formData).then(() => {
			this.props.history.push('/departement');
		});
	};
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Ajouter un Chef de Departement </strong>
					</CardHeader>

					<CardBody>
						<Form action="" method="post">
							<div align="center">
								<img
									align="center"
									src={'http://localhost:3000/uploads/' + this.state.img}
									style={{
										verticalAlign: 'middle',
										width: '150px',
										height: '150px',
										borderRadius: '50%'
									}}
									alt="image Chef departement "
								/>
								<h1>{this.state.nom + ' ' + this.state.prenom}</h1>
							</div>
							<FormGroup>
								<Label htmlFor="nf-password">Image : </Label>

								<Input type="file" name="image" id="image" onChange={this.fileChangedHandler} />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-email">Departement :</Label>

								<Input
									type="text"
									id="nf-email"
									name="departement"
									onChange={this.onInputChange}
									placeholder="nom de departement .."
								/>
							</FormGroup>
							<FormGroup row className="my-0">
								<Col xs="4">
									<FormGroup>
										<Label htmlFor="city">Prenom </Label>
										<Input
											name="prenom"
											type="text"
											id="city"
											placeholder="Enter votre prenom "
											onChange={this.onInputChange}
										/>
									</FormGroup>
								</Col>
								<Col xs="4">
									<FormGroup>
										<Label htmlFor="postal-code">Nom</Label>
										<Input
											type="text"
											name="nom"
											id="postal-code"
											placeholder="Enter votre nom"
											onChange={this.onInputChange}
										/>
									</FormGroup>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Email : </Label>

								<Input type="email" name="email" placeholder="email..." onChange={this.onInputChange} />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Telephone de Chef : </Label>

								<Input
									type="text"
									name="telephone"
									placeholder="Content..."
									onChange={this.onInputChange}
								/>
							</FormGroup>
						</Form>
					</CardBody>
					<CardFooter>
						<Button type="button" size="sm" onClick={this.onFormSubmit} color="primary">
							<i className="fa fa-dot-circle-o" /> Ajouter
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
