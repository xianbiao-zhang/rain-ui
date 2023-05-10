import type { ChangeEvent, FC} from 'react';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import { Button } from 'raind';
import './style/index.less';
import type { UploadProps, UploadFile } from './interface';

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onProgress,
    onSuccess,
    beforeUpload,
    onError,
    onChange,
    onRemove,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multpart/form-data',
        },
        onUploadProgress: (e) => {
          if (!e.total) {
            return;
          }
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100 && onProgress) {
            updateFileList(_file, { percent: percentage, status: 'uploadding' });
            onProgress(percentage, file);
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(() => {
            post(file);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  return (
    <div className="rain-upload-component">
      <Button type="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        className="rain-file-input"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        type="file"
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
