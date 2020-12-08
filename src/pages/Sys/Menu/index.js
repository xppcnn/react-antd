import React, { useState } from "react";
import { Button, Card, Table } from "antd";
import useSelection from "antd/lib/table/hooks/useSelection";
import MenuModal from "./MenuModal";

const data = [
  {
    id: 5,
    name: "首页",
    url: "/home",
    icon: "DashboardOutlined",
    desc: "首页",
    sort: 1,
    parentId: 0,
    level: 1,
    children: null,
  },
  {
    id: 1,
    name: "权限管理",
    url: "/auth",
    icon: "MenuUnfoldOutlined",
    desc: "权限管理",
    sort: 10,
    parentId: 0,
    level: 1,
    children: [
      {
        id: 2,
        name: "菜单管理",
        url: "/auth/menu",
        icon: "ArrowDown",
        desc: "菜单管理",
        sort: 1,
        parentId: 1,
        level: 2,
      },
      {
        id: 3,
        name: "用户管理",
        url: "/auth/user",
        icon: "UserOutlined",
        desc: "用户管理",
        sort: 2,
        parentId: 1,
        level: 2,
      },
      {
        id: 4,
        name: "角色管理",
        url: "/auth/role",
        icon: "TeamOutlined",
        desc: "角色管理",
        sort: 3,
        parentId: 1,
        level: 2,
      },
    ],
  },
];

const columns = [
  {
    title: "标题",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "序号",
    dataIndex: "sort",
    width: "12%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
];

const Menu = () => {
  const [visiable, setVisiable] = useState(false);

  const handleAdd = () => {
    setVisiable(true);
  };

  return (
    <>
    <MenuModal />
      <Card
        title="系统菜单"
        extra={<Button onClick={handleAdd}>添加下级菜单</Button>}
      >
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default Menu;
