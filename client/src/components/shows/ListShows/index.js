import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Divider,
  Typography,
  Col,
  Card,
  Popconfirm,
  Tooltip,
  Badge,
  // Button
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Detail from "./detail";
import Spinner from "../../../utils/spinner";
import { getShow, getShows, deleteShow } from "../../../actions/showActions";
import EditShow from "../EditShow";
import { getMovies } from "../../../actions/movieActions";

const { Title, Text } = Typography;
const { Meta } = Card;

const ListShows = (props) => {
  const [visible, setVisible] = useState(false);
  const [editShowState, setEditShowState] = useState(false);

  const [selectedEditableShow, setSelectedEditableShow] = useState({});
  const [selectedShow, setSelectedShow] = useState({});

  const text = "Are you sure you want to delete this show?";

  let mainContent;

  const { getShows, deleteShow, getMovies } = props;
  const { shows, loading } = props.show;
  const { movies } = props.movie;

  useEffect(() => {
    getShows();
    getMovies();
  }, [getShows, getMovies]);

  const confirm = (e, showId) => {
    setVisible(false);
    e.preventDefault();
    deleteShow(showId);
  };

  const cancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const showDrawer = (e, show) => {
    e.preventDefault();
    setSelectedShow(show);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const changeState = () => {
    setEditShowState(false);
  };

  // const editShow = (e, myShow) => {

  // }

  const changeCinemaName = (name) => {
    if(name === "CINEMA_ONE"){
      return "Cinema One"
    }else if(name === "CINEMA_TWO"){
      return "Cinema Two"
    }else if(name === "CINAME_THREE"){
      return "Cinema Three"
    }
  }


  if (shows === null || (loading && !editShowState)) {
    mainContent = <Spinner />;
  } else {
    if (editShowState) {
      mainContent = (
        <EditShow
          movies = {movies}
          changeStatus={changeState}
          selectedEditableShow={selectedEditableShow}
        />
      );
    } else if (shows.length > 0) {
      mainContent = (
        <Row gutter={18} style={{ marginLeft: 10 }}>
          {shows.map((show) => {
            return (
              <Col className="gutter-row" span={5}>
                <div>
                  <Card
                    hoverable
                    onClick={(e) => showDrawer(e, show)}
                    // style={{ width: 250 }}
                    style={{
                      marginTop: 20,
                      height: "auto",
                      borderRadius: "16px",
                      boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    }}
                    cover={
                      <img
                        alt="example"
                        src={show.movie.imageUrl}
                        style={{ height: 350 }}
                        // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      />
                    }
                    actions={[
                      <Tooltip
                        placement="top"
                        title={show.availableSeats + " seats available"}
                      >
                        <Badge count={show.availableSeats} style={{ backgroundColor: '#87d068' }} />
                      </Tooltip>,
                      <Tooltip placement="top" title="Edit Show">
                        <EditOutlined
                          key="edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEditableShow(show);
                            setEditShowState(true);
                          }}
                        />
                      </Tooltip>,
                      <Popconfirm
                        placement="top"
                        title={text}
                        onConfirm={(e) => confirm(e, show.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Tooltip placement="top" title="Delete show">
                          <DeleteOutlined />
                        </Tooltip>
                      </Popconfirm>,
                      // <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta title={changeCinemaName(show.cinema)} description={show.showDay + " " + show.showTime} />
                    <Divider />
                    <Text type="secondary">
                      <b>{show.movie.title}</b>
                    </Text>
                    <br/>
                    <Text type="secondary">{show.movie.description}</Text>
                    {/* <Divider/> */}
                    {/* <Row style={{ marginTop: 10 }}>
                      <Col span={12}>
                        <Button
                          type="primary"
                          style={{ width: "90%" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEditableShow(show);
                            setEditShowState(true);
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Popconfirm
                          placement="top"
                          title={text}
                          onConfirm={(e) => confirm(e, show.id)}
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
                    </Row> */}
                    <Row>
                    
                    </Row>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      );
    } else {
      mainContent = <h4>No shows found ...</h4>;
    }
  }

  return (
    <div>
      {!editShowState && (
        <Divider orientation="left">
          <Title level={3}>Shows</Title>
        </Divider>
      )}
      {mainContent}
      <Detail visible={visible} selectedShow={selectedShow} onClose={onClose} />
    </div>
  );
};

ListShows.propTypes = {
  show: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  getShow: PropTypes.func.isRequired,
  getShows: PropTypes.func.isRequired,
  deleteShow: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  show: state.show,
  movie: state.movie
});

export default connect(mapStateToProps, { getShow, getShows, deleteShow, getMovies })(
  withRouter(ListShows)
);
