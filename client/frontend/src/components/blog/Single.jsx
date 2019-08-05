import React, { Component } from 'react';
// import PropTypes from "prop-types";
import Icofont from 'react-icofont';
import { Link } from 'react-router-dom';
import { getEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';

//Import Component
import Sidebar from "./Sidebar"; 
import Comments from "./Comment";

class Single extends Component {

    state = {
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
    };
    componentWillMount() {
        this.props.getEvent(this.props.match.params.id);
    }

    extractDay = date => {
        const dateMilli = Date.parse(date);
        return new Date(dateMilli * 1000).getDay();
      };
    
      extractMonth = date => {
        const dateMilli = Date.parse(date);
        const monthNumber = new Date(dateMilli * 1000).getMonth();
        return this.state.months[monthNumber];
          
      };
    
    render() {

        const { event,loading } = this.props;
        const username = event.user ? event.user.username : 'unknown';
        console.log('username:', username)

        const singleEvent = loading ? 'loading details' : (
            <React.Fragment>
                <div className="bread-cumbs-area bread-cumbs-bg">
                    <div className="diplay-table">
                        <div className="display-table-cell">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h1>Detailed Event</h1>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="blog" className="our-blog main-blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="blog-details">
                                            <div className="post-img">
                                                <img src={`http://localhost:4000/${event.image}`} alt="blog-one" />
                                            </div>
                                            
                                            <div className="blog-info">
                                                <div className="date-box">
                                                    {this.extractDay(event.dateStart)} <span className="month">{this.extractMonth(event.dateStart)}</span>
                                                </div>
                                                <div className="title-meta">
                                                    <h2>{event.title}</h2>
                                                    <div className="post-meta">
                                                        <ul>
                                                            <li><Icofont icon="icofont-funky-man" /> Posted By: <Link to={'/#0'}>{username}</Link></li>
                                                            <li><Icofont icon="icofont-tags" /> Tags: <Link to={'/#0'}>{event.type}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                
                                            <div className="post-content">
                                                <p>{event.description}</p>
                                                
                                                <div className="sharing-link">
                                                    <ul>
                                                        <li><strong>Shear : </strong></li>
                                                        <li><Link to={'/#0'}><Icofont icon="icofont-facebook" /></Link></li>
                                                        <li><Link to={'/#0'}><Icofont icon="icofont-twitter" /></Link></li>
                                                        <li><Link to={'/#0'}><Icofont icon="icofont-instagram" /></Link></li>
                                                        <li><Link to={'/#0'}><Icofont icon="icofont-linkedin" /></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                                                                        
                               
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar: src/components*/}
                            <Sidebar />

                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
        return singleEvent;
    }
}
// Single.propTypes = {
//     Title: PropTypes.string,
//     Content: PropTypes.string,
//     SingleImage:PropTypes.string,
//     SingleTitle: PropTypes.string,
//     SingleDate: PropTypes.string,
//     SingleMonth: PropTypes.string,
//     authorLink: PropTypes.string,
//     authorName: PropTypes.string,
//     CommentsLink: PropTypes.string,
//     TotalComments: PropTypes.string,
//     TagLink: PropTypes.string,
//     TagName: PropTypes.string,
//     PostContent: PropTypes.string,
//     FacebookLink: PropTypes.string,
//     TwitterLink: PropTypes.string,
//     InstagramLink: PropTypes.string,
//     linkedinLink: PropTypes.string,

// };

// //Default Props
// Single.defaultProps = {
//     Title: "Blog Details",
//     Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac augue at erat hendrerit dictum. Praesent porta, purus eget sagittis imperdiet.",
//     SingleImage: require("../../assets/img/blog-one.jpg"),
//     SingleTitle: "Risus commodo viverra mae.",
//     SingleDate: "10",
//     SingleMonth: "Mar",
//     authorLink: "/#0",
//     authorName: "Jone",
//     CommentsLink: "/#0",
//     TotalComments: "545",
//     TagLink: "/#0",
//     TagName: "Business",
//     PostContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
//     FacebookLink: "/#0",
//     TwitterLink: "/#0",
//     InstagramLink: "/#0",
//     linkedinLink: "/#0",

// }

const mapStateToProps = state => ({
    errors: state.errors,
    event: state.event.event,
    loading: state.event.loading
  });
  
  export default connect(
    mapStateToProps,
    { getEvent }
  )(Single);