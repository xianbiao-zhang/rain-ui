import type { ReactNode } from 'react';

interface UploadProps {
  /**
   * @description       必选参数，上传的地址
   * @default           ''
   */
  action: string;
  /**
   * @description       上传文件的列表
   * @default           []
   */
  defaultFileList?: UploadFile[];
  /**
   * @description       上传文件之前的钩子，参数为false或者Promise则停止上传
   * @default           default
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * @description       上传文件时的钩子
   * @default           default
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * @description       上传文件成功的钩子
   * @default           default
   */
  onSuccess?: (data: any, file: File) => void;
  /**
   * @description       上传文件失败的钩子
   * @default           default
   */
  onError?: (err: any, file: File) => void;
  /**
   * @description       文件状态改变时的钩子，上传成功或者失败都会被调用
   * @default           default
   */
  onChange?: (file: File) => void;
  /**
   * @description       文件列表移除文件时的钩子
   * @default           default
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * @description       设置上传的请求头部
   * @default           default
   */
  headers?: Record<string, any>;
  /**
   * @description       上传文件的文件字段名
   * @default           default
   */
  name?: string;
  /**
   * @description       上传文时附带的额外参数
   * @default           default
   */
  data?: Record<string, any>;
  /**
   * @description       支持发送 cookie 凭证信息
   * @default           default
   */
  withCredentials?: boolean;
  /**
   * @description       接受上传的文件类型
   * @default           default
   */
  accept?: string;
  /**
   * @description       是否支持多选文件
   * @default           default
   */
  multiple?: boolean;
  /**
   * @description       是否支持拖拽上传
   * @default           default
   */
  drag?: boolean;
  children?: ReactNode;
}

type UploadFileStatus = 'ready' | 'uploadding' | 'success' | 'error';
interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export type { UploadProps, UploadFile };
