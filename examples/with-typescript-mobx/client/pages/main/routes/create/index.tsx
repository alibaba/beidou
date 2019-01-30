import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Button, Input, Field } from '@alifd/next';
import cls from 'classnames/bind';
import style from './index.m.scss';
import { IStore } from '../../store';

const cx = cls.bind(style);

interface IProps extends IStore {}

@inject('user')
@observer
class Create extends React.Component<IProps> {
  field: any;
  constructor(props) {
    super(props);
    this.field = new Field(this, {
      onChange: this.handleFieldChange,
    });
  }

  handleFieldChange = (name, value) => {
    const { user } = this.props;
    user[name] = value;
  }

  handleCreate = () => {
    const { user } = this.props;
    user.create();
  }

  render() {
    const { init } = this.field;
    const { name, email } = this.props.user;
    return (
      <div className={cx('create')}>
        <h2>User Create</h2>
        <Form field={this.field}>
            <Form.Item required requiredMessage="required!">
                <Input name="email" value={email} {...init('email', { initValue: email })}/>
            </Form.Item>
            <Form.Item required requiredMessage="required!">
                <Input name="name" value={name} {...init('name', { initValue: name })}/>
            </Form.Item>
        </Form>

        <Button onClick={this.handleCreate}>Create</Button>
      </div>
    );
  }
}

export default Create;
