import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom';
import { Spin, Result, Button, Layout, Typography } from 'antd';
import { getPageTitle, systemRouteList } from '../router/utils';
import './UserLayout.less';

class UserLayout extends React.PureComponent {
  state = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch() {
    // 上报错误
  }

  render() {
    if (this.state.isError) {
      return (
        <Result
          status="warning"
          title="系统错误，请联系管理员"
          extra={
            <Button type="primary" key="console">
              Go Contact
            </Button>
          }
        />
      );
    }

    const title = getPageTitle(systemRouteList);
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className="container">
          <div className="content">
            <div className="top">
              <Typography.Title className="header">
                <Link to="/">
                  <span className="title"> 哈哈哈管理平台 </span>
                </Link>
              </Typography.Title>
              <div className="desc">
                哈哈哈
              </div>
            </div>
            <Suspense fallback={<Spin className="layout__loading" />}>
              <Switch>
                {systemRouteList.map((menu) => (
                  <Route
                    exact
                    key={menu.path}
                    path={menu.path}
                    component={menu.component}
                    redirect={menu.redirect}
                  ></Route>
                ))}
              </Switch>
            </Suspense>
          </div>
          <Layout.Footer style={{ textAlign: 'center' }}>
            技术支持: xwl51120@163.com
          </Layout.Footer>
        </div>
      </>
    );
  }
}

export default UserLayout;
