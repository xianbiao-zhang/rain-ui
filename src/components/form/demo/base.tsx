import React from 'react';
import { Form, FormItem, Input, Button } from 'raind';
import type { CustomRule } from '../useStore';

const App: React.FC = () => {
  const confirmRules: CustomRule[] = [
    { type: 'string', required: true, min: 3, max: 8 },
    ({ getFieldValue }) => ({
      asyncValidator(rule, value) {
        console.log('the value', getFieldValue('password'));
        console.log(value);
        return new Promise((resolve, reject) => {
          if (value !== getFieldValue('password')) {
            reject('The two passwords that you entered do not match!');
          }
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
    }),
  ];
  return (
    <Form initialValues={{ username: 'kerman' }}>
      <FormItem label="用户名" name="username" rules={[{ type: 'email', required: true }]}>
        <Input />
      </FormItem>
      <FormItem
        label="密码"
        name="password"
        rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
      >
        <Input type="password" />
      </FormItem>
      <FormItem label="重复密码" name="confirmPed" rules={confirmRules}>
        <Input type="password" />
      </FormItem>
      <div className="agreeement-section" style={{ display: 'flex' }}>
        <FormItem
          name="agreetext"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked}
        >
          <input type="checkbox" />
        </FormItem>
        <span className="agree-text">
          注册即代表你同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="rain-form-submit-area">
        <Button type="primary">登陆</Button>
      </div>
    </Form>
  );
};

export default App;
