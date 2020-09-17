import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './index.less';
import { getBreadcrumbs } from '../../router/utils';

function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs());

    const unListen = history.listen(() => {
      setBreadcrumbs(getBreadcrumbs());
    });

    return () => {
      unListen();
    };
  }, []);

  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        {breadcrumbs.map((route) => (
          <Breadcrumb.Item key={route.path}>{route.meta.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default memo(Breadcrumbs);
