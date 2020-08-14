import React from 'react';
import { Layout, Menu } from "antd";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import Posts from './pages/Posts';
import GraphLine from './pages/GraphLine';

const { Header, Content } = Layout;

function App(props:any): JSX.Element {
  const sideBarMenuKey = useLocation().pathname;
  return (
    <Layout  className="layout">
      <Header className="site-layout-background" style={{ padding: 0 }} >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[sideBarMenuKey]}>
          <Menu.Item key="/">
            <Link to="/">Line Graph</Link>
          </Menu.Item>
          <Menu.Item key="/posts">
            <Link to="/posts">Posts</Link>     
          </Menu.Item>
        </Menu>
      </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Switch>
            <Route exact path="/">
              <GraphLine/>
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
          </Switch>
        </Content>
    </Layout>
  );
}

export default App;
