import React from 'react';
import { Menu } from 'raind';
const App: React.FC = () => {
  return (
    <Menu mode="horizontal">
      <Menu.SubMenu title="test">
        <Menu.Item>A</Menu.Item>
        <Menu.Item>B</Menu.Item>
        <Menu.Item>C</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="test1">
        <Menu.Item>A</Menu.Item>
        <Menu.Item>B</Menu.Item>
        <Menu.Item>C</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default App;
