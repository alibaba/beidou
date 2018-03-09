import React from 'react';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;

function validatePrimeNumber(number) {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'The prime between 8 and 12 is 11!',
  };
}

class RawForm extends React.Component {
  state = {
    number: {
      value: 11,
    },
  };
  handleNumberChange = (value) => {
    this.setState({
      number: {
        ...validatePrimeNumber(value),
        value,
      },
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const number = this.state.number;
    const tips =
      'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="Prime between 8 & 12"
          validateStatus={number.validateStatus}
          help={number.errorMsg || tips}
        >
          <InputNumber
            min={8}
            max={12}
            value={number.value}
            onChange={this.handleNumberChange}
          />
        </FormItem>
      </Form>
    );
  }
}

export default RawForm;
