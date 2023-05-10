import type { FC } from 'react';
import React from 'react';
import { Input } from 'raind';

const App: FC = () => {
  return (
    <>
      <Input placeholder="添加后缀" append=".com" />
      <Input placeholder="添加前缀" prepend="https//" />
    </>
  );
};

export default App;
