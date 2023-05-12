import type { FC } from 'react';
import React from 'react';
import { Upload, Button } from 'raind';
import type { UploadFile } from '../interface';

const App: FC = () => {
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 2342, name: 'test1', status: 'success' },
    { uid: '456', size: 2342, name: 'test2', status: 'uploadding' },
    { uid: '789', size: 2342, name: 'test3', status: 'error' },
    { uid: '012', size: 2342, name: 'test4', status: 'ready' },
  ];
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts/" defaultFileList={defaultFileList}>
      <Button type="primary">点击上传文件</Button>
    </Upload>
  );
};

export default App;
