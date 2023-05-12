import type { FC } from 'react';
import React from 'react';
import { Upload, Button } from 'raind';

const App: FC = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts/" accept=".png" multiple>
      <Button type="primary">点击上传文件</Button>
    </Upload>
  );
};

export default App;
