import type { FC } from 'react';
import React from 'react';
import type { UploadFile } from './interface';
import { Icon } from 'raind';
import Progress from './progress';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="rain-upload-list">
      {fileList.map((item) => {
        return (
          <li className="rain-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" />
              {item.name}
            </span>
            <span className="file-status">
              {item.status === 'uploadding' && <Icon icon="spinner" />}
              {item.status === 'success' && <Icon icon="check-circle" />}
              {item.status === 'error' && <Icon icon="times-circle" />}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === 'uploadding' && <Progress percent={item.percent || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
