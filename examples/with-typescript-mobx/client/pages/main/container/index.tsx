import * as React from 'react';
import cls from 'classnames/bind';
import style from './index.m.scss';
import Nav from '../layout/nav';
import routes from '../routes';

const cx = cls.bind(style);

interface IContentProps {
  className?: string;
}

class Container extends React.Component<IContentProps> {
  render() {
    const { className, ...others } = this.props;
    return (
      <div className={cx('app', className)} {...others}>
        <Nav />
        <div className={cx('content')}>
          {routes}
        </div>
      </div>
    );
  }
}
export default Container;
