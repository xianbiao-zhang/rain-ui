import type { InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm';
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * @description 是否禁用Input
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 设置 input 大小，支持 lg 或者是 sm
   * @default default
   */
  size?: InputSize;
  /**
   * @description 添加图标，在右侧悬浮添加一个图标，用于提示
   * @default null
   */
  icon?: IconProp;
  /**
   * @description 添加前缀，用于配置一些固定组合
   * @default null
   */
  prepend?: string | ReactElement;
  /**
   * @description 添加后缀，用于配置一些固定组合
   * @default null
   */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type { InputProps };
