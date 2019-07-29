import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import axios from 'axios';
export default class display extends Component {
	state = {
		image: '',
		nom: '',
		prenom: '',
		telephone: '',
		email: '',
		departement: '',
		img: '',
		updated: false
	};
	async componentDidMount() {
		console.log(this.props.match.params.id);
		axios.get('http://localhost:3000/dep/getByID/' + this.props.match.params.id).then(async (data) => {
			this.setState({ departement: data.data.departement });
			this.setState({ img: data.data.image });
			this.setState({ _id: data.data._id });
			await axios.get('http://localhost:3000/uploads/' + this.state.img).then((data) => {
				this.setState({ image: data.data });
			});
			this.setState({ nom: data.data.nom });
			this.setState({ prenom: data.data.prenom });
			this.setState({ email: data.data.email });
			this.setState({ telephone: data.data.telephone });

			console.log(this.state);
		});
	}
	fileChangedHandler = (event) => {
		this.setState({ image: event.target.files[0], updated: true });
		const formData = new FormData();
		formData.append('image', event.target.files[0]);
		axios.post('http://localhost:3000/dep/upload', formData).then((data) => {
			this.setState({ img: data.data });
		});
	};
	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	};
	onFormSubmit = (e) => {
		e.preventDefault();

		if (this.state.updated) {
			const formData = new FormData();

			formData.append('image', this.state.image);
			formData.append('departement', this.state.departement);
			formData.append('telephone', this.state.telephone);
			formData.append('email', this.state.email);
			formData.append('nom', this.state.nom);
			formData.append('prenom', this.state.prenom);
			axios.put('http://localhost:3000/dep/updateImage/' + this.state._id, formData).then((data) => {
				this.props.history.push('/departement');
			});
		} else {
			axios
				.put('http://localhost:3000/dep/update/' + this.state._id, {
					nom: this.state.nom,
					prenom: this.state.prenom,
					departement: this.state.departement,
					telephone: this.state.telephone,
					email: this.state.email
				})
				.then((data) => {
					this.props.history.push('/departement');
				});
		}
	};
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Modifer un Chef de Departement </strong>
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
									value={this.state.departement}
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
											value={this.state.prenom}
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
											value={this.state.nom}
										/>
									</FormGroup>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Email : </Label>

								<Input
									type="email"
									name="email"
									placeholder="email..."
									value={this.state.email}
									onChange={this.onInputChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Telephone de Chef : </Label>

								<Input
									type="text"
									name="telephone"
									placeholder="Content..."
									onChange={this.onInputChange}
									value={this.state.telephone}
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
