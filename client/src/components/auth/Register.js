import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { registerUser } from "../../actions/authActions";

const { Title } = Typography;
const tailLayout = {
  wrapperCol: {
    // offset: 5,
    span: 5,
  },
};

const Register = (props) => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(props.errors !== errors){
      setErrors(props.errors);
    }

  }, [props.errors, errors]);


  const responseMessage = (errorText) => {
    notification["error"]({
      message: 'Failed to register!',
      description: errorText,
    });
  };

  const onSubmit = (values) => {
    const newUser = {
      userName: values["username"],
      email: values["email"],
      password: values["password"],
    };
    props.registerUser(newUser, props.history);

  };

  // const onSubmitFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  if(props.auth.isAuthenticated){
    props.history.push('/dashboard');
  }

  const validatePassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Password missmatch!");
    } else {
      callback();
    }
  };

  return (
    <div align="center" className="login">
      <div className="login-inner">
        <Card
          title={<Title level={3}>Sign up</Title>}
          bordered={true}
          style={{
            width: 500,
            marginBottom: -3,
            borderRadius: "8px",
            // boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
            boxShadow: "5px 8px 24px 5px",
          }}
        >
          { errors.message ? responseMessage(errors.message) : null}
          <Form
            style={{ margin: 20, width: 350 }}
            name="basic"
            form={form}
            initialValues={{
              remember: false,
            }}
            onFinish={onSubmit}
            // onFinishFailed={onSubmitFailed}
          >
            <Form.Item
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
              style={{ marginBottom: 20 }}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input a valid email!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: 20 }}
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
            <Form.Item
              name="confirmPassword"
              style={{ marginBottom: 20 }}
              rules={[
                { required: true, message: "Please confirm your Password!" },
                { validator: validatePassword },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
