import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';

const mapState = (state: any) => {
  return {
    list: state?.lotteryRecord?.list,
  };
};

const TableList: React.FC<{ dispatch: Function }> = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.LotteryRecordItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.LotteryRecordItem>[] = [
    {
      title: <FormattedMessage id="pages.recordTable.id" defaultMessage="ID" />,
      dataIndex: '_id',
      tip: 'The id is the unique key',
      hideInSearch: true,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.recordTable.user" defaultMessage="ID" />,
      dataIndex: 'userId',
    },
    {
      title: <FormattedMessage id="pages.recordTable.oreUsed" defaultMessage="ID" />,
      dataIndex: 'oreUse',
      hideInSearch: true,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.recordTable.oreRemains" defaultMessage="剩余" />,
      dataIndex: 'oreRemain',
      hideInSearch: true,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.recordTable.optionTime" defaultMessage="ID" />,
      dataIndex: 'updatedAt',
      hideInSearch: true,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.recordTable.prize" defaultMessage="ID" />,
      dataIndex: 'prizeName',
      search: false,
    },
  ];

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async () => {
    const hide = message.loading('正在删除');
    if (!selectedRowsState) return true;
    try {
      const success = await props.dispatch({
        type: 'lotteryRecord/deleteRecord',
        payload: selectedRowsState.map((item) => item._id),
      });
      hide();
      if (success) message.success('Deleted successfully and will refresh soon');
      return success;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  return (
    <PageContainer>
      <ProTable<API.LotteryRecordItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        request={(params) => {
          if (params.name) {
            params.name = params.name.trim();
          }
          if (params.userId) {
            params.userId = params.userId.trim();
          }
          return props?.dispatch({
            type: 'lotteryRecord/getList',
            payload: {
              current: params.current || 1,
              pageSize: params.pageSize || 20,
              ...params,
            },
          });
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove();
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default connect(mapState)(TableList);
