import { Modal } from "antd";
import React from "react";

const MenuModal = (props) => {
  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default MenuModal;
