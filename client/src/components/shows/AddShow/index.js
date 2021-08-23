import React, { useState, useEffect } from "react";
import {
  Form,
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
import CinemaNames from "./CinemaNames";
import showImage from "../../../assets/img/show.jpeg";
import { getMovies } from "../../../actions/movieActions";
import { addShow } from "../../../actions/showActions";

const { Option } = Select;
const { Title } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const AddShow = (props) => {
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);

  const { goBackToShow, getMovies } = props;
  const { movies } = props.movie;

  const showDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];

  const showTimes = [
    "2:30 p.m",
    "5:00 p.m",
    "7:00 p.m"
  ];

  useEffect(() => {
    if (props.errors !== errors) {
      setErrors(props.errors);
    }
    getMovies();
  }, [props.errors, errors, getMovies]);

  const responseMessage = (errorText) => {
    notification["error"]({
      message: "Failed to add movie!",
      description: errorText,
    });
  };

  const onSubmit = (values) => {
    setFlag(true);
    let mov = getMovie(values["movie"]);
    const showInfo = {
      movie: mov,
      cinema: values["cinema"],
      showDay: values["showDay"],
      showTime: values["showTime"]
    };
    props.addShow(showInfo, props.history);
    setTimeout(() => {
      goBackToShow();
    }, 2000);
  };

  const getMovie = (id) => {
    let m = null;
    movies && movies.map((movie) => {
      if(movie.id === id){
        m = movie;
      }
      return null; 
    });
    return m;
  }

  return (
    <Row>
      <Col span={12} className="gutter-row">
        <div align="left" className="add">
          <Card
            title={<Title level={3}>Add Show</Title>}
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
                {...layout}
                style={{ margin: 20, width: 600 }}
                name="nest-messages"
                onFinish={onSubmit}
              >
                <Form.Item
                  name="movie"
                  label="Movie"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    //   onChange={onGenreChange}
                    allowClear
                    placeholder="Please select a movie"
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
                    {movies.map((movie) => {
                      return <Option value={movie.id}>{movie.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="cinema"
                  label="Cinema"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    //   onChange={onGenreChange}
                    allowClear
                    placeholder="Please select cinema"
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
                    {CinemaNames.map((cinema) => {
                      return <Option value={cinema}>{cinema}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="showDay"
                  label="Show Day"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    //   onChange={onGenreChange}
                    allowClear
                    placeholder="Please select day"
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
                    {showDays.map((showDay) => {
                      return <Option value={showDay}>{showDay}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="showTime"
                  label="Show Time"
                  style={{ marginBottom: 20 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    //   onChange={onGenreChange}
                    allowClear
                    placeholder="Please select show time"
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
                    {showTimes.map((showTime) => {
                      return <Option value={showTime}>{showTime}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 200 }}
                  >
                    Add
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
            src={showImage}
            style={{
              height: 510,
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

AddShow.propTypes = {
  addShow: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
  errors: state.errors,
});

export default connect(mapStateToProps, { addShow, getMovies })(
  withRouter(AddShow)
);
