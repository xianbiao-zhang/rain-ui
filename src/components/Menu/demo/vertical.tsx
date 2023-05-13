import React from 'react';
import { Menu } from 'raind';
const App: React.FC = () => {
  return (
    <Menu mode="vertical">
      <Menu.Item>item link</Menu.Item>
      <Menu.Item>item link 2</Menu.Item>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.SubMenu title="下拉选项">
        <Menu.Item>下拉选项一</Menu.Item>
        <Menu.Item>下拉选项二</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default App;
