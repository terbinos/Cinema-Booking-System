import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser, getCurrentUser } from "../../actions/authActions";

const { Title } = Typography;
const tailLayout = {
  wrapperCol: {
    // offset: 5,
    span: 5,
  },
};

const Login = (props) => {
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);

  const { getCurrentUser } = props;
  useEffect(() => {

    if(props.auth.isAuthenticated){
      getCurrentUser(props.auth.user.sub);
      props.history.push('/dashboard');
    }

    if(props.errors !== errors){
      setErrors(props.errors);
    }

  }, [props.errors, errors, props.auth, props.history, getCurrentUser]);


  if(props.auth.isAuthenticated){
    props.history.push('/dashboard');
  }
  
  const responseMessage = (errorText) => {
    notification["error"]({
      message: 'Failed to login!',
      description: errorText,
    });
  };

  const onSubmit = (values) => {
    setFlag(true);
    const userInfo = {
      email: values["username"],
      password: values["password"],
    };
    props.loginUser(userInfo);
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div align="center" className="login">
      <div className="login-inner">
        <Card
          title={<Title level={3}>Login</Title>}
          bordered={true}
          style={{
            width: 500,
            marginBottom: -3,
            borderRadius: "8px",
            // boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
            boxShadow: "5px 8px 24px 5px",
          }}
        >
          { (errors.token && !props.auth.isAuthenticated && flag) ? responseMessage(errors.token) : null}
          <Form
            style={{ margin: 20, width: 350 }}
            name="basic"
            initialValues={{
              remember: false,
            }}
            onFinish={onSubmit}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              // label="Username"
              style={{ marginBottom: 20 }}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              // label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, getCurrentUser })(withRouter(Login));
