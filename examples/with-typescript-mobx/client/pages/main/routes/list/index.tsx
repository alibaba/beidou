import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from '@alifd/next';
import { Link } from 'react-router-dom';

import cls from 'classnames/bind';
import style from './index.m.scss';
import { IStore } from '../../store';

const cx = cls.bind(style);

interface IProps extends IStore {}

@inject('user')
@observer
export default class List extends React.Component<IProps> {

  componentDidMount() {
    const { list } = this.props.user;
    if (!list) {
      this.props.user.getAll();
    }
  }
  render() {
    const { list = [] } = this.props.user;
    return (
      <div className={cx('list')}>

        <h2>User list</h2>
        <Table dataSource={list}>
            <Table.Column title="Id" dataIndex="id"/>
            <Table.Column title="Name" dataIndex="name"/>
            <Table.Column title="Email" dataIndex="email"/>
            <Table.Column
              title="Operation"
              cell={(v, i, r) => {
                return (
                  <Link to={`/user/${r.id}`}>detail</Link>
                );
              }}
            />
        </Table>
      </div>
    );
  }
}
