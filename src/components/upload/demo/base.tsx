import type { FC } from 'react';
import React from 'react';
import { Upload } from 'raind';
import type { UploadFile } from '../interface';

const App: FC = () => {
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 2342, name: 'test1', status: 'success' },
    { uid: '456', size: 2342, name: 'test2', status: 'uploadding' },
    { uid: '789', size: 2342, name: 'test3', status: 'error' },
  ];
  const onProgress = (percentage: number) => {
    console.log(percentage);
  };
  const onSuccess = () => {
    console.log('Success');
  };
  const onError = () => {
    console.log('Error');
  };
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onProgress={onProgress}
      onSuccess={onSuccess}
      onError={onError}
      defaultFileList={defaultFileList}
    />
  );
};

export default App;
