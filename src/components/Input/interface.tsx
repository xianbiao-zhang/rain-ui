import type { InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm';
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 输入框大小 sz | lg
   * @default default
   */
  size?: InputSize;
  /**
   * @description 图标
   * @default null
   */
  icon?: IconProp;
  /**
   * @description 自定义前缀
   * @default null
   */
  prepend?: string | ReactElement;
  /**
   * @description 自定义后缀
   * @default null
   */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type { InputProps };
