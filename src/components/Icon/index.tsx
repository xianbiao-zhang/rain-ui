import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style/index.less';
import type IconProps from './interface';

const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...resetProps } = props;
  const classes = classNames('rain-icon', className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...resetProps} />;
};

export default Icon;
