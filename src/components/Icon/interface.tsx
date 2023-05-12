import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export type ThemeProps = 'primary' | 'success' | 'warning' | 'error';

interface IconProps extends FontAwesomeIconProps {
  /**
   * @description       主题
   * @default           'primary' | 'success' | 'warning' | 'error'
   */
  theme?: ThemeProps;
}

export default IconProps;
