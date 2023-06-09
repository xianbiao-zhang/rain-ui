import type { FC, ReactNode} from 'react';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import './style/index.less';
import { FormContext } from './form';
import type { CustomRule } from './useStore';

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
  rules?: CustomRule[];
  validateTrigger?: string;
}

const FormItem: FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
  } = props as SomeRequired<
    FormItemProps,
    'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'
  >;
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext);
  const rowClass = classNames('rain-row', {
    'rain-row-no-label': !label,
  });

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || '';
    dispatch({
      type: 'addFiled',
      name,
      value: { label, name, value, rules: rules || [], errors: [], isValid: true },
    });
  }, []);
  // 获取store 对应的 value
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  const isRequired = rules?.some((rule) => typeof rule !== 'function' && rule.required);
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    'rain-form-item-required': isRequired,
  });
  const itemClass = classNames('rain-form-item-control', {
    'rain-form-item-has-error': hasError,
  });
  const onValueUpdate = (e: any) => {
    const newValue = getValueFromEvent(e);
    console.log('new value', newValue);
    dispatch({ type: 'updateValue', name, value: newValue });
  };
  const onValueValidate = async () => {
    await validateField(name);
  };
  // 1 手动的创建一个属性列表，需要用 value 以及 onChange 属性
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  // 2 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children);
  // 没有子组件
  if (childList.length === 0) {
    console.log('No child element found in Form.Item, please provide a child element');
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn('Only support one child elemnet in Form.Item');
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element');
  }
  const child = childList[0] as React.ReactElement;
  // 3 clonetElement，混合这个 child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(child, { ...child.props, ...controlProps });
  return (
    <div className={rowClass}>
      {label && (
        <div className="rain-form-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="rain-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="rain-form-tem-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e) => e.target.value,
};

export default FormItem;
