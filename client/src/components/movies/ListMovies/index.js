import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Divider, Typography, Col, Card, Button, Popconfirm } from "antd";
import Detail from "./detail";
import Spinner from "../../../utils/spinner";
import {
  getMovie,
  getMovies,
  deleteMovie,
} from "../../../actions/movieActions";
import EditMovies from "../EditMovies";

const { Title } = Typography;
const { Meta } = Card;

const ListMovies = (props) => {
  const [visible, setVisible] = useState(false);
  const [editState, setEditState] = useState(false);

  const [selectedEditableMovie, setSelectedEditableMovie] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});

  const text = "Are you sure you want to delete this movie?";

  let mainContent;

  const { getMovies, deleteMovie } = props;
  const { movies, loading } = props.movie;

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const confirm = (e, movieId) => {
    setVisible(false);
    e.preventDefault();
    deleteMovie(movieId);
  };

  const cancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const showDrawer = (e,movie) => {
    e.preventDefault();
    setSelectedMovie(movie);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const changeState = () => {
    setEditState(false);
  };

  if (movies === null || (loading && !editState)) {
    mainContent = <Spinner />;
  } else {
    if (editState) {
      mainContent = (
        <EditMovies changeStatus={changeState} selectedEditableMovie={selectedEditableMovie} />
      );
    } else if (movies.length > 0) {
      mainContent = (
        <Row gutter={18} style={{ marginLeft: 10 }}>
          {movies.map((movie) => {
            return (
              <Col className="gutter-row" span={5}>
                <div>
                  <Card
                    hoverable
                    onClick={(e) => showDrawer(e,movie)}
                    // style={{ width: 250 }}
                    style={{ marginTop: 20, height: "auto", borderRadius: "16px", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
                    cover={
                      <img
                        alt="example"
                        src={movie.imageUrl}
                        style={{height:350}}
                        // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      />
                    }
                  >
                    <Meta title={movie.title} description={movie.description} />
                    <Divider />
                    <Row style={{ marginTop: 10 }}>
                      <Col span={12}>
                        <Button
                          type="primary"
                          style={{ width: "90%" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEditableMovie(movie);
                            setEditState(true);
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Popconfirm
                          placement="top"
                          title={text}
                          onConfirm={(e) => confirm(e, movie.id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            type="primary"
                            style={{ width: "90%" }}
                            danger
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      );
    } else {
      mainContent = <h4>No movies found ...</h4>;
    }
  }

  return (
    <div>
      {!editState && (
        <Divider orientation="left">
          <Title level={3}>Movies</Title>
        </Divider>
      )}
      {mainContent}
      <Detail visible={visible} selectedMovie={selectedMovie} onClose={onClose} />
    </div>
  );
};

ListMovies.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovie: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, { getMovie, getMovies, deleteMovie })(
  withRouter(ListMovies)
);
