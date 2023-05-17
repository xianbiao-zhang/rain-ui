import type { ReactNode } from 'react';
type MenuMode = 'horizontal' | 'vertical';

interface MenuProps {
  /**
   * @description       默认 active 的菜单项的索引值
   * @default           '0'
   */
  defaultIndex?: string;
  className?: string;
  /**
   * @description       菜单类型 横向或者纵向
   * @default           'horizontal'
   */
  mode?: MenuMode;
  style?: React.CSSProperties;
  /**
   * @description       点击菜单项触发的回调函数
   * @default           -
   */
  onSelect?: (selectedIndex: string) => void;
  /**
   * @description       设置子菜单的默认打开 只在纵向模式下生效
   * @default           []
   */
  defaultOpenSubMenus?: string[];
  children?: ReactNode;
}

interface MenuItemProps {
  index?: string;
  /**
   * @description       选项是否被禁用
   * @default           false
   */
  disabled?: boolean;
  /**
   * @description       选项扩展的 className
   * @default           -
   */
  className?: string;
  /**
   * @description       选项自定义的 style
   * @default           -
   */
  style?: React.CSSProperties;
  children?: ReactNode;
}

interface SubMenuProps {
  index?: string;
  /**
   * @description       下拉菜单选项的文字
   * @default           -
   */
  title: string;
  /**
   * @description       下拉菜单选项的扩展类名
   * @default           -
   */
  className?: string;
  children?: ReactNode;
}

export { MenuProps, MenuMode, MenuItemProps, SubMenuProps };
