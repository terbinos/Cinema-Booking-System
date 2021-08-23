import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  LaptopOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AddMovies from "../movies/AddMovies";
import ListMovies from "../movies/ListMovies";
import EditMovies from "../movies/EditMovies";
import AddShow from "../shows/AddShow";
import EditShow from "../shows/EditShow";
import ListShows from "../shows/ListShows";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Movie List");

  const goBackToMovieList = () => {
    setSelectedMenuItem("Movie List");
  };

  const goBackToShowList = () => {
    setSelectedMenuItem("Show List");
  };

  const switchComponent = (key) => {
    switch (key) {
      case "Add Movie":
        return <AddMovies goBack={goBackToMovieList} />;
      case "Edit Movie":
        return <EditMovies />;
      case "Movie List":
        return <ListMovies />;
      case "Add Show":
        return <AddShow goBackToShow={goBackToShowList} />;
      case "Edit Show":
        return <EditShow />;
      case "Show List":
        return <ListShows />;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={selectedMenuItem}
            // mode="horizontal"
            onClick={(e) => setSelectedMenuItem(e.key)}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub-movie", "sub-seat"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub-movie" icon={<LaptopOutlined />} title="Movies">
              <Menu.Item key="Movie List" icon={<UnorderedListOutlined />}>
                Movie list
              </Menu.Item>
              <Menu.Item key="Add Movie" icon={<PlusCircleOutlined />}>
                Add movies
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub-seat" icon={<LaptopOutlined />} title="Shows">
              <Menu.Item key="Show List" icon={<UnorderedListOutlined />}>
                Show List
              </Menu.Item>
              <Menu.Item key="Add Show" icon={<PlusCircleOutlined />}>
                Add Show
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenuItem}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              // height:"auto"
              minHeight: "auto",
            }}
          >
            {switchComponent(selectedMenuItem)}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
