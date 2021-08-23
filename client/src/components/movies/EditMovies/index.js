import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Typography,
  notification,
  Row,
  Col,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editMovie } from "../../../actions/movieActions";
import genres from "../AddMovies/genres";
import popCornImage from "../../../assets/img/popcorn.jpg";
const config = require("../../../config.json");

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const tailLayout = {
  wrapperCol: {
    // offset: 5,
    span: 20,
  },
};
const EditMovie = (props) => {
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const { selectedEditableMovie, changeStatus } = props;

  useEffect(() => {
    if (props.errors !== errors) {
      setErrors(props.errors);
    }
  }, [props.errors, errors]);

  const onChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const responseMessage = (errorText) => {
    notification["error"]({
      message: "Failed to edit movie!",
      description: errorText,
    });
  };

  // const onSubmit = (values) => {
  //   setFlag(true);
  //   const movieInfo = {
  //     id: selectedEditableMovie.id,
  //     title: values["title"],
  //     genre: values["genre"],
  //     description: values["description"],
  //     trailerUrl: values["trailerUrl"],
  //     imageUrl: data.secure_url,
  //   };
  //   props.editMovie(movieInfo);
  //   setTimeout(() => {
  //     changeStatus();
  //   }, 2000);
  // };

  const onSubmit = async (values) => {
    setFlag(true);
    console.log("Selected Image", selectedImage);
    if(selectedImage){
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", config.upload_preset);
      await fetch(config.cloudinary_api, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const movieInfo = {
            id: selectedEditableMovie.id,
            title: values["title"],
            genre: values["genre"],
            description: values["description"],
            trailerUrl: values["trailerUrl"],
            imageUrl: data.secure_url,
          };
          props.editMovie(movieInfo,);
        });
    }else {
      const movieInfo = {
        id: selectedEditableMovie.id,
        title: values["title"],
        genre: values["genre"],
        description: values["description"],
        trailerUrl: values["trailerUrl"],
        imageUrl: "",
      };
      props.editMovie(movieInfo);
    }
    
    setTimeout(() => {
      changeStatus();
    }, 2000);
  };
  return (
    <Row>
      <Col span={12} className="gutter-row">
        <div align="left" className="add">
          <Card
            title={<Title level={3}>Edit Movie</Title>}
            bordered={true}
            style={{
              width: "auto",
              marginBottom: -3,
              borderRadius: "16px",
              boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
            }}
          >
            {errors.message && flag ? responseMessage(errors.message) : null}
            <div align="center">
              <Form
                style={{ margin: 20, width: 600 }}
                name="nest-messages"
                onFinish={onSubmit}
                initialValues={{
                  title: selectedEditableMovie.title,
                  genre: selectedEditableMovie.genre,
                  description: selectedEditableMovie.description,
                  trailerUrl: selectedEditableMovie.trailerUrl,
                }}
              >
                <Form.Item
                  name="title"
                  label="Title"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input style={{ width: 515 }} />
                </Form.Item>
                <Form.Item
                  name="genre"
                  label="Genre"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: 500 }}
                    //   onChange={onGenreChange}
                    allowClear
                    placeholder="Please select a genre"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {genres.map((g) => {
                      return <Option value={g}>{g}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Movie Description"
                    style={{ width: 470 }}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
                <Form.Item
                  name="trailerUrl"
                  label="Trailer Link"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="imageUrl"
                  label="Image"
                  style={{ marginBottom: 20 }}
                  
                >
                  <input type="file" onChange={(event) => onChange(event)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 200, marginLeft:-72  }}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      </Col>
      <Col span={12} className="gutter-row">
        <div align="center">
          <img
            alt="example"
            src={popCornImage}
            style={{
              height: 425,
              width: 810,
              marginRight: -50,
              marginTop: -24,
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

EditMovie.propTypes = {
  editMovie: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { editMovie })(withRouter(EditMovie));
