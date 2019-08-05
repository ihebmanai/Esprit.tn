import React, { Component } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Carousel,
	CarouselCaption,
	CarouselControl,
	CarouselIndicators,
	CarouselItem,
	Col,
	Button
} from 'reactstrap';
import { getNews } from '../../actions/newsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
var items = [
	{
		src:
			'http://localhost:3000/uploads/2019-07-06T13-28-24.292Z50830659_2239430346304430_4660211967686868992_n.jpg',
		altText: 'Slide 1',
		caption: 'Slide 1'
	}
];

export default class detail extends Component {
	state = { news: {} };

	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}
	componentDidMount() {
		this.props.getNews(this.props.match.params.id);

		items[0].src = 'http://localhost:4000/uploads/' + this.props.image;
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	render() {
		const { activeIndex } = this.state;
		const disc = () => {
			return this.state.description;
		};

		const slides2 = items.map((item) => {
			return (
				<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
					<img className="d-block w-100" src={item.src} alt={item.altText} />
					<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
				</CarouselItem>
			);
		});
		let { news } = this.props;
		return (
			<div>
				<Col align="center" xs="12" xl="10">
					<Card>
						<CardHeader>
							<i className="fa fa-cercle" />
							<strong>{news.title}</strong>
						</CardHeader>
						<CardBody>
							<Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
								<CarouselIndicators
									items={items}
									activeIndex={activeIndex}
									onClickHandler={this.goToIndex}
								/>
								{slides2}
								<CarouselControl
									direction="prev"
									directionText="Previous"
									onClickHandler={this.previous}
								/>
								<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
							</Carousel>
						</CardBody>
					</Card>
				</Col>
				<div className="card">
					<div className="card-header">
						<div align="center">
							<Button color="primary">update</Button> <Button color="danger">Delete</Button>
						</div>
					</div>
					<div className="card-body">{news.description}</div>
				</div>
			</div>
		);
	}
}
