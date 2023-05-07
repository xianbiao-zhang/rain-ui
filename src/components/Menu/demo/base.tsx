import React from 'react';
import { Menu } from 'raind';
const App: React.FC = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item disabled>A</Menu.Item>
      <Menu.Item>B</Menu.Item>
      <Menu.Item>C</Menu.Item>
      <Menu.Item>A</Menu.Item>
    </Menu>
  );
};

export default App;
