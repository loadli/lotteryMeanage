import { Button, message, Modal, Select } from 'antd';
import React, { useRef } from 'react';
import { FormattedMessage, useDispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { changeTransportStatus } from './services';

const mapState = (state: any) => {
  return {
    list: state?.deliveryRecord?.list,
  };
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch<any>();

  const changeTransport = (record: API.DeliveryRecordItem) => {
    Modal.confirm({
      title: '确认发货',
      icon: <ExclamationCircleOutlined />,
      content: '请确认礼品已经发送成功',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // 修改发货状态
        try {
          const res = await changeTransportStatus({ id: record._id });
          if (res.data) {
            message.success('发货成功');
            actionRef.current?.reload();
          }
        } catch (e) {
          message.error('发货失败');
        }
      },
    });
  };

  const columns: ProColumns<API.DeliveryRecordItem>[] = [
    {
      title: <FormattedMessage id="pages.deliveryTable.Winning" defaultMessage="ID" />,
      dataIndex: 'prizeId',
      tip: 'The id is the unique key',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.deliveryTable.addressee" defaultMessage="ID" />,
      dataIndex: 'name',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.deliveryTable.tel" defaultMessage="ID" />,
      dataIndex: 'phone',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.deliveryTable.address" defaultMessage="ID" />,
      dataIndex: 'address',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.deliveryTable.prize" defaultMessage="ID" />,
      dataIndex: 'prizeName',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.deliveryTable.transport" defaultMessage="ID" />,
      dataIndex: 'transport',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        true: {
          text: '已发货',
          status: 'Success',
        },
        false: {
          text: '未发货',
          status: 'Error',
        },
      },
      search: false,
    },
    {
      title: '发货状态',
      key: 'deliveryStatus',
      hideInTable: true,
      dataIndex: 'transport',
      renderFormItem: (item, { type }) => {
        if (type === 'form') {
          return null;
        }
        return (
          <Select
            {...item.fieldProps}
            placeholder="请选择"
            options={[
              {
                label: '已发货',
                value: '1',
              },
              {
                label: '未发货',
                value: '2',
              },
              {
                label: '全部',
                value: '3',
              },
            ]}
          />
        );
      },
    },
    {
      title: <FormattedMessage id="pages.deliveryTable.deliveryOption" defaultMessage="ID" />,
      dataIndex: 'prizeName',
      render: (text, record, _, action) => [
        <Button
          type="link"
          disabled={record.transport}
          onClick={() => {
            // transport 为true  已发货 false 未发货
            changeTransport(record);
          }}
        >
          {record.transport ? '已发货' : '发货'}
        </Button>,
      ],
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.DeliveryRecordItem, API.PageParams & { deliveryStatus?: string }>
        actionRef={actionRef}
        rowKey="_id"
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const res = await dispatch({
            type: 'deliveryRecord/getList',
            payload: {
              current: actionRef.current?.pageInfo?.current || 1,
              pageSize: actionRef.current?.pageInfo?.pageSize || 20,
              transport: params.deliveryStatus,
            },
          });
          return res;
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default connect(mapState)(TableList);
