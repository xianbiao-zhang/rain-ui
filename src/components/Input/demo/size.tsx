import type { FC } from 'react';
import React from 'react';
import { Input } from 'raind';

const App: FC = () => {
  return (
    <>
      <Input size="sm" placeholder="小号Input" />
      <Input size="lg" placeholder="大号Input" />
    </>
  );
};

export default App;
