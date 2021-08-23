import React, { Component } from "react";
import { Menu, Typography, Avatar } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  PlaySquareTwoTone,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const { Title } = Typography;
class Navbar extends Component {
  state = {
    current: "",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { current } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item
          key="Title"
          icon={
            <PlaySquareTwoTone style={{ fontSize: "25px", marginLeft: 10 }} />
          }
        >
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <Title
              style={{ marginTop: 8, float: "left", color: "white" }}
              level={4}
            >
              My Movie Tickets
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<LoginOutlined />}
          style={{ float: "right" }}
        >
          <a href="/#" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </Menu.Item>
        <Title
          style={{
            marginTop: 10,
            marginRight: 5,
            float: "right",
            color: "white",
          }}
          level={5}
        >
          <Avatar style={{ backgroundColor: '#1a53ff', marginRight:5 }}>{user.sub.charAt(0)}</Avatar>
          {user.sub}
        </Title>
      </Menu>
    );

    const guestLinks = (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item
          key="Title"
          icon={
            <PlaySquareTwoTone style={{ fontSize: "25px", marginLeft: 10 }} />
          }
        >
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <Title
              style={{ marginTop: 8, float: "left", color: "white" }}
              level={4}
            >
              My Movie Tickets
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          style={{ float: "right" }}
        >
          <Link to="/register">Sign up</Link>
        </Menu.Item>
        <Menu.Item
          key="login"
          icon={<LoginOutlined />}
          style={{ float: "right" }}
        >
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    );
    return isAuthenticated ? authLinks : guestLinks;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
