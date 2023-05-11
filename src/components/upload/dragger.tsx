import type { FC, DragEvent } from 'react';
import React, { useState } from 'react';
import classNames from 'classnames';
interface DraggerProps {
  onFile: (files: FileList) => void;
  children: any;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const kclass = classNames('rain-uploader-dragger', {
    'is-dragover': dragOver,
  });
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  const handleDrag = (event: DragEvent<HTMLElement>, over: boolean) => {
    event.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={kclass}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
