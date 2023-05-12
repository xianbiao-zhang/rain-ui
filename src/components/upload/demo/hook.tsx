import type { FC } from 'react';
import React from 'react';
import { Upload, Button } from 'raind';
import type { UploadFile } from '../interface';

const App: FC = () => {
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 2342, name: 'test1', status: 'success' },
  ];
  const beforeUpload = (file: File) => {
    console.log(file);
    return true;
  };
  const onProgress = (percentage: number) => {
    console.log(percentage);
  };
  const onSuccess = (data: any, file: File) => {
    console.log(data);
    console.log(file);
  };
  const onError = (data: any, file: File) => {
    console.log(data);
    console.log(file);
  };
  const onChange = (file: File) => {
    console.log(file);
  };
  const onRemove = (file: UploadFile) => {
    console.log(file);
  };
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      beforeUpload={beforeUpload}
      onProgress={onProgress}
      onSuccess={onSuccess}
      onError={onError}
      onChange={onChange}
      defaultFileList={defaultFileList}
      onRemove={onRemove}
    >
      <Button type="primary">点击上传文件，控制台查看打印信息</Button>
    </Upload>
  );
};

export default App;
