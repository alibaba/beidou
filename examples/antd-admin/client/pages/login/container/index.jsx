import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import actions from '../actions';
import style from './index.module.less';
import logo from '../../../assets/logo.png';

const cx = classNames.bind(style);
const FormItem = Form.Item;

const Login = ({
  dispatch,
  form: { getFieldDecorator, validateFieldsAndScroll },
  message: { error, text },
  loading,
  logined,
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch(actions.login(values));
    });
  }

  return (
    <div className={cx('form')}>
      <div className={cx('logo')}>
        <img alt={'logo'} src={logo} />
        <span>Antd Admin Login</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Input
              size="large"
              onPressEnter={handleOk}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Input
              size="large"
              type="password"
              onPressEnter={handleOk}
              placeholder="Password"
            />
          )}
        </FormItem>
        <Row>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleOk}
            disabled={logined}
          >
            {logined ? 'Login Successfully' : 'Sign in'}
          </Button>
          <p className={cx({ error })}>{text}</p>
          <p>
            <span>Username：beidou</span>
            <span>Password：admin</span>
          </p>
        </Row>
      </form>
    </div>
  );
};

export default connect(state => state)(
  Form.create({
    onFieldsChange(props, changedFields) {
      props.dispatch(actions.fieldChange(changedFields));
    },
    mapPropsToFields(props) {
      return {
        username: Form.createFormField({
          ...props.username,
          value: props.username.value,
        }),
        password: Form.createFormField({
          ...props.password,
          value: props.password.value,
        }),
      };
    },
  })(Login)
);
