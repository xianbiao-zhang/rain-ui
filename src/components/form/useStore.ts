import { useReducer, useState } from 'react';
import type { RuleItem, ValidateError } from 'async-validator';
import Schema from 'async-validator';
import { mapValues, each } from 'lodash-es';

export type CustomRuleFunc = ({ getFieldValue }) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;

export interface FiledDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}

export type FiledsState = Record<string, FiledDetail>;

export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

export interface FormState {
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, ValidateError[]>;
}

export interface FiledsAction {
  type: 'addFiled' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
}
function filedsReducer(state: FiledsState, action: FiledsAction) {
  switch (action.type) {
    case 'addFiled':
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true, isSubmitting: false, errors: {} });
  const [fields, dispatch] = useReducer(filedsReducer, {});
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  };
  const transfromRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === 'function') {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      } else {
        return rule;
      }
    });
  };
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const afterRules = transfromRules(rules);
    const descriptor = {
      [name]: afterRules,
    };
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as any;
      console.log('e', err.errors);
      console.log('fields', err.fields);
      errors = err.errors;
    } finally {
      console.log('errors', isValid);
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } });
    }
  };

  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    const valueMap = mapValues(fields, (item) => item.value);
    const descriptor = mapValues(fields, (item) => transfromRules(item.rules));
    const validator = new Schema(descriptor);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as ValidateErrorType;
      errors = err.fields;
      each(fields, (value, name) => {
        // errors 中有对应的 key'
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: 'updateValidateResult',
            name,
            value: { isValid: false, errors: itemErrors },
          });
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } });
        }
        // 有对应的 rules, 并且没有 errors
      });
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors });
      return {
        isValid,
        errors,
        values: valueMap,
      };
    }
  };
  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
    validateAllFields,
  };
}

export default useStore;
