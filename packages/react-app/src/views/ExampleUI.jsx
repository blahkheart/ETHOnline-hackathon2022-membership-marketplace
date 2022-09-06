// import { Layout } from 'antd';
// import { SyncOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { utils } from "ethers";
import { SyncOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Address, Balance, Events } from "../components";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Explore } from ".";

export default function ExampleUI({
  address,
  mainnetProvider,
  blockExplorer,
  localProvider,
  userSigner,
  price,
  tx,
  readContracts,
  writeContracts,
  // ...props
}) {
  const { Sider, Content } = Layout;
  const history = useHistory();

  // const links = [
  //   {
  //     icon: LaptopOutlined,
  //     label: "Dashboard",
  //     route: "/dashboard",
  //   },
  //   {
  //     icon: UserOutlined,
  //     label: "Profile",
  //     route: "/dashboard/profile",
  //   },
  //   {
  //     icon: SyncOutlined,
  //     label: "Explore",
  //     route: "/dashboard/explore",
  //   },
  //   {
  //     icon: NotificationOutlined,
  //     label: "Broadcast",
  //     route: "/dashboard/create",
  //   },
  // ].map((link, index) => {
  //   const key = String(index + 1);
  //   return {
  //     key: key,
  //     icon: React.createElement(link.icon),
  //     label: link.label,
  //     path: link.route,
  //   };
  // });

  return (
    <Layout>
      {/* <Header>Header</Header> */}
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            // defaultSelectedKeys={["/dashboard"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
          >
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <LaptopOutlined /> <span>Dashboard</span>{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="/explore">
              <Link to="/dashboard/explore">
                <SyncOutlined /> <span>Explore</span>{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="/create">
              <Link to="/dashboard/create">
                <NotificationOutlined /> <span>Broadcast</span>{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="/profile">
              <Link to="/dashboard/profile">
                <UserOutlined /> <span>Profile</span>{" "}
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px 12px 20px 12px" }}>
            {address && (
              <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} fontSize={18} />
            )}
          </div>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 500,
            }}
          >
            <Switch>
              <Route exact path="/dashboard">
                DASHBOARD
              </Route>
              <Route path="/dashboard/profile">PROFILE</Route>
              <Route path="/dashboard/explore">
                <Explore />
              </Route>
              <Route path="/dashboard/create">CREATE</Route>
            </Switch>
            {/* {props.children} */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
