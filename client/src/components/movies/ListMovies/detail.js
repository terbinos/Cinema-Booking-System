import React  from "react";
// import ModalVideo from 'react-modal-video';
import { Drawer, Divider, Col, Row } from "antd";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const Detail = (props) => {
  const { selectedMovie } = props;
  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
    >
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        <h1>Movie Detail</h1>
      </p>
      <Divider />
      <p className="site-description-item-profile-p">
        <h3>{selectedMovie.title}</h3>
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Description"
            content={selectedMovie.description}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <DescriptionItem title="Release Date" content="February 2,1900" />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">Other details</p>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="Trailer link"
            content={
              <a href={selectedMovie.trailerUrl} target="_blank"  rel="noreferrer">
                Watch Trailer for {selectedMovie.title}
              </a>
            }
          />
        </Col>
      </Row>
      {/* <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="r0iDAjXWU4Q" onClose={() => setOpen(false)} /> */}
    </Drawer>
  );
};


export default Detail;
