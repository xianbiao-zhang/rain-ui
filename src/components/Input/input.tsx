import type { FC, InputHTMLAttributes, ReactElement } from 'react';
import React from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

const Input: FC<InputProps> = (props) => {
  // 取出各种的属性
  const { disabled, size, icon, prepend, append, style, ...resetProps } = props;
  // 根据属性计算不同的className
  const classes = classNames('rain-input-wrapper', {
    'input-disabled': disabled,
    [`input-size-${size}`]: size,
    'inpit-group': prepend || append,
    'inpit-group-append': !!append,
    'input-group-prepend': !!prepend,
  });
  return (
    // 根据属性是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="rain-input-group-prepend">{prepend}</div>}
      {icon && (
        <div>
          <Icon icon={icon} />
        </div>
      )}
      <input className="rain-input-inner" disabled={disabled} {...resetProps} />
      {append && <div className="rain-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
