import { Button, message, Drawer } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { removeRule } from '@/services/ant-design-pro/api';
import { connect } from 'dva';

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
    list: state?.prize?.list
  }
}

const PrizeTable: React.FC<{ dispatch: Function }> = (props) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * 设置页数和数据大小
   */
  const [ current, setCurrent ] = useState(1);
  const [ pageSize, setPageSize ] = useState(20);


  //   useEffect(async function () {
  //   const dispatch = props?.dispatch;
  //   const list = await dispatch({
  //     type: 'prize/getList',
  //     payload: {
  //       current,
  //       pageSize,
  //     }
  //   })
  //   console.log(list)
  // }, [])

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const filter: ProColumns<API.RuleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.prizeType.typeLabel"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'name',
      tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
  ];

  const columns: ProColumns<API.RuleListItem>[] =[
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.name"
          defaultMessage="Name"
        />
      ),
      dataIndex: 'name',
    },
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.prizeRemain"
          defaultMessage="Prize Remain"
        />
      ),
      dataIndex: 'prizeRemain',
    },
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.prizeSum"
          defaultMessage="Prize Sum"
        />
      ),
      dataIndex: 'prizeSum',
    },
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.type"
          defaultMessage="Type"
        />
      ),
      dataIndex: 'type',
    },
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.probability"
          defaultMessage="Probability"
        />
      ),
      dataIndex: 'probability',
    },
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.enableDatetime"
          defaultMessage="Enable Time"
        />
      ),
      dataIndex: 'enableDatetime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.prizeTable.enable"
          defaultMessage="Enable"
        />
      ),
      dataIndex: 'enable',
      render: (value) => {
        return (
          <div>{ value ? '是' : '否' }</div>
        );
      },
    },
  ]

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
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
          return props?.dispatch({
            type: 'prize/getList',
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



export default connect(mapState)(PrizeTable);
