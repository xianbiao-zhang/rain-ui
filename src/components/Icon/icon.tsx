import React from 'react';
import classNames from 'classnames';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style/index.less';

export type ThemeProps = 'primary' | 'success' | 'warning' | 'error';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...resetProps } = props;
  const classes = classNames('rain-icon', className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...resetProps} />;
};

export default Icon;
