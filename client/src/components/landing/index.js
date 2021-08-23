import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Button, Divider } from 'antd';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1
                  className="display-3 mb-4"
                  style={{ color: "white", marginTop: "150px" }}
                >
                  Get Your Tickets
                </h1>
                <p className="lead" style={{ color: "white" }}>
                  {" "}
                  Create your account, choose movies, book a seat and get your
                  ticket right away!
                </p>
                <Divider style={{color:"black"}}><p className="lead" >Get Started</p></Divider>
                <Link to="/register">
                  {" "}
                  <Button type="primary" size="large" style={{width:100, marginRight:20}}>
                    <p>Sign up</p>
                  </Button>
                </Link>
                <Link to="/login">
                  {" "}
                  <Button type="block" size="large" style={{width:100}}>
                    <p>Login</p>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
