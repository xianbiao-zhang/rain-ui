import type { ReactElement } from 'react';
import type { InputProps } from '../Input/interface';

interface DataSourceObject {
  value: string;
}
type DataSourceType<T = {}> = T & DataSourceObject;

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * @description 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的Promise
   * @default []
   */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceObject[]>;
  /**
   * @description 点击选中建议项时触发的回调
   * @default null
   */
  onSelect?: (str: DataSourceType) => void;
  /**
   * @description 支持自定义渲染下拉项，返回 ReactElement
   * @default null
   */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export type { AutoCompleteProps, DataSourceType };
