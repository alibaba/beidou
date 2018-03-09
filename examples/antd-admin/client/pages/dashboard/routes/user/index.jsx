import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Popconfirm } from 'antd';
import queryString from 'query-string';
import Page from 'client/components/page';
import List from './list';
import Filter from './filter';
import Modal from './modal';
import actions from '../../actions';

const obj2query = obj => queryString.stringify(obj);

const User = ({ location, history, dispatch, user }) => {
  location.query = queryString.parse(location.search);
  const {
    loading,
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType,
    isMotion,
    selectedRowKeys,
  } = user;
  const { pageSize } = pagination;

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.modal,
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch(actions.user[modalType](data));
    },
    onCancel() {
      dispatch(actions.user.hideModal());
    },
  };

  const listProps = {
    dataSource: list,
    loading: loading.list,
    pagination,
    location,
    isMotion,
    onChange(page) {
      const { query, pathname } = location;
      dispatch(
        history.push({
          pathname,
          query: {
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          },
        })
      );
    },
    onDeleteItem(item) {
      dispatch(actions.user.delete(item));
    },
    onEditItem(item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'user/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
  };

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      history.push({
        pathname: location.pathname,
        search: obj2query({
          ...value,
          page: 1,
          pageSize,
        }),
      });
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length
        ? history.push({
          pathname: '/user',
          search: obj2query({
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          }),
        })
        : history.push({
          pathname: '/user',
        });
    },
    onAdd() {
      dispatch(actions.user.showModal('create'));
    },
    switchIsMotion() {
      dispatch(actions.user.switchIsMotion());
    },
  };

  const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    });
  };

  return (
    <Page inner>
      <Filter {...filterProps} />
      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm
              title={'Are you sure delete these items?'}
              placement="left"
              onConfirm={handleDeleteItems}
            >
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>
                Remove
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      )}
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  );
};

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ user }) => ({ user }))(User);
