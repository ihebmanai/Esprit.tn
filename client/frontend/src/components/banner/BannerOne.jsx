import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel3";
import Icofont from "react-icofont";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";

class BannerOne extends Component {
    render() {
        //BannerOne loop start
        const banneronedata = this.props.banneronesData.map(
            (bannerone, index) => (
                <div className={bannerone.BgClass} key={index}>
                    <div className="diplay-table overlay">
                        <div className="display-table-cell">
                            <VisibilitySensor>
                                {({ isVisible }) => (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <span
                                                className={
                                                    isVisible
                                                        ? "hero-text animated fadeInDown slow opacityOne"
                                                        : "opacityZero"
                                                }
                                            >
                                                {bannerone.TopTitle}
                                            </span>

                                            <h1
                                                className={
                                                    isVisible
                                                        ? "animated fadeInDown slow opacityOne"
                                                        : "opacityZero"
                                                }
                                            >
                                                {bannerone.Title}
                                            </h1>
                                            <p
                                                className={
                                                    isVisible
                                                        ? "animated fadeInDown slow opacityOne"
                                                        : "opacityZero"
                                                }
                                            >
                                                {bannerone.Content}
                                            </p>
                                            <div className="center-wrap">
                                                <Link to={bannerone.BtnLink} className="btn-a">
                                                    <div className="button">
                                                        {bannerone.BtnName}
                                                        <Icofont icon="icofont-long-arrow-right" />
                                                    <div className="mask" /></div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </VisibilitySensor>
                        </div>
                    </div>
                    </div>
            )
        );
        //BannerOne loop END
        
        //Thumbs loop Start
        const thumbdata = this.props.thumbsData.map((thumb, index) => (
            <div className="owl-thumb-item" key={index}>
                <Icofont icon={thumb.ThumbIcon} />
                <h3>{thumb.ThumbTitle}</h3>
                <p>{thumb.ThumbContent}</p>
            </div>
            )
        );
        //Thumbs loop END
        return (
            <React.Fragment>
                <div id="home" className="hompage-slides-wrapper">
                    <OwlCarousel
                        className="owl-theme homepage-slides"
                        items={1}
                        touchDrag={true}
                        margin={0}
                        mouseDrag={false}
                        smartSpeed={1000}
                        dotData={true}
                        dotsContainer={".owl-thumbs"}
                    >
                        {banneronedata}
                    </OwlCarousel>

                    <div className="owl-thumbs">
                        {thumbdata}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
//Props Types
BannerOne.propTypes = {
    banneronesData: PropTypes.array,
    thumbsData: PropTypes.array
};

//Default Props
BannerOne.defaultProps = {
    banneronesData: [
        {
            BgClass: "single-slider-item slide-bg-1 ",
            TopTitle: "Ecole Supérieure Privée d'Ingénierie et de Technologies",
            Title: "Esprit, se former autrement.",
            Content:
                "Créé en 2003, la School of Engineering accueille désormais prêt de 5000 élèves répartis en 4 spécialités : Informatique, Télécommunication, Génie Civil et Génie électromécanique.",
            BtnLink:  "/#0",
            BtnName: "A PROPOS "
        },
        {
            BgClass: "single-slider-item slide-bg-2 ",
            TopTitle: "Pour s'inscrire au concours",
            Title: "Concours d'admission (2020/2021)",
            Content:
                "Pour avoir plus d'informations ou pour s'inscrire au concours clickez ici",
            BtnLink:  "/#0",
            BtnName: "Admission"
        },
        {
            BgClass: "single-slider-item slide-bg-3 ",
            TopTitle: "Nos accréditations",
            Title: "La reconnaissance et l'accréditation des diplômes depuis 2014",
            Content:
                "EUR-ACE / CDIO / CGE / UniTWIN",
            BtnLink:  "/#0",
            BtnName: "Accreditations"
        }
    ],
    thumbsData: [
        {
            ThumbIcon:'icofont-education',
            ThumbTitle: "ESPRIT",
            ThumbContent: "Ecole Supérieure Privée d'Ingénierie et de Technologies",
        },
        {
            ThumbIcon:'icofont-certificate-alt-2',
            ThumbTitle: "Admission",
            ThumbContent: "Concours d'admission (2020/2021) : Inscriptions ouvertes",
        },
        {
            ThumbIcon:'icofont-globe-alt',
            ThumbTitle: "Accredidations",
            ThumbContent: "La reconnaissance et l'accréditation des diplômes depuis 2014",
        },
        
    ]
};

export default BannerOne;
