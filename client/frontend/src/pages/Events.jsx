import React, { Component } from 'react';

//Import Component
import NavBar from "../components/NavBar";
import BlogBanner from "../components/blog/BlogBanner";
import BlogPost from "../components/blog/BlogPost";
import Footer from "../components/Footer";

class Events extends Component {
  render() {
    return (
        <React.Fragment>
            {/* NavBar: src/components/NavBar.jsx */}
            <NavBar />
            {/* BlogPost: src/components/Blog/BlogPost.jsx */}
            {/* NavBar: src/components/blog/BlogBanner.jsx */}
            <BlogBanner />
            {/* NavBar: src/components/blog/BlogPost.jsx */}
            <BlogPost />
            {/* NavBar: src/components/Footer.jsx */}
            <Footer />
        </React.Fragment>
    );
  }
}
export default Events;
