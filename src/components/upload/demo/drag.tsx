import type { FC } from 'react';
import React from 'react';
import { Upload, Icon } from 'raind';

const App: FC = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts/" drag>
      <Icon icon="cloud-arrow-up" theme="primary" />
      点击或拖拽上传文件
    </Upload>
  );
};

export default App;
