import type { FC } from 'react';
import React from 'react';

import classNames from 'classnames';
import Icon from '../Icon/icon';
import type { InputProps } from './interface';

const Input: FC<InputProps> = (props) => {
  // 取出各种的属性
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  // 根据属性计算不同的className
  const classes = classNames('rain-input-wrapper', {
    'input-disabled': disabled,
    [`input-size-${size}`]: size,
    'inpit-group': prepend || append,
    'inpit-group-append': !!append,
    'input-group-prepend': !!prepend,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    // 根据属性是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="rain-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className="rain-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="rain-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
