import { Button, message, Drawer } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { connect } from 'dva';
// import { effects } from './model';
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const mapState = (state: any) => {
  return {
    list: state?.lotteryRecord?.list
  }
}

const TableList: React.FC<{ dispatch: Function }> = (props) => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * 设置页数和数据大小
   */
  const [ current, setCurrent ] = useState(1);
  const [ pageSize, setPageSize ] = useState(20);
  const [ list, setList ] = useState([]);
  // useEffect(async function () {
  //   const dispatch = props?.dispatch;
  //   const list = await dispatch({
  //     type: 'lotteryRecord/getList',
  //     payload: {
  //       current,
  //       pageSize,
  //     }
  //   })
  // }, [])

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.LotteryRecordItem>[] =[
    {
      title: (
        <FormattedMessage
          id="pages.recordTable.id"
          defaultMessage="ID"
        />
      ),
      dataIndex: '_id',
      tip: 'The id is the unique key',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.recordTable.user"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'userId',
    },
    {
      title: (
        <FormattedMessage
          id="pages.recordTable.oreUsed"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'oreUse',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.recordTable.oreRemains"
          defaultMessage="剩余"
        />
      ),
      dataIndex: 'oreRemain',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.recordTable.optionTime"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'updatedAt',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.recordTable.prize"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'name',
    },
  ]

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
        // dataSource={list}
        // request={rule} // current pageSize
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
              current,
              pageSize,
              ...params
            }
          })
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
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};



export default connect(mapState)(TableList);
