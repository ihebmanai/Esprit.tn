import React, { Component } from 'react';
import { getPress } from "../../actions/pressActions";
import { connect } from "react-redux";

 class updatePress extends Component {


        state ={
         press : {},
         title : 'undef'
        }
    

    componentDidMount () {
        this.props.getPress(this.props.match.params.id) 
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.press.press)
        this.setState({
            title : nextProps.press.title
        })
    }
    render() {
        return (
            <div>
                hello dhia {this.state.title}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
    press: state.press.press,
  });
  
  export default connect(
    mapStateToProps,
    { getPress }
  )(updatePress);


