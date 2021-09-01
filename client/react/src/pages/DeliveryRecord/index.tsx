import { Button, message, Drawer , Modal, Input,Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { connect } from 'dva';
import { changeTransportStatus, getDeliveryRecordList } from './services'
// import { effects } from './model';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};





const mapState = (state: any) => {
  return {
    list: state?.deliveryRecord?.list
  }
}

const TableList: React.FC = (props) => {
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

  const changeTransport = (record:API.DeliveryRecordItem)=>{
    Modal.confirm({
        title: '确认发货',
        icon: <ExclamationCircleOutlined />,
        content: '请确认礼品已经发送成功',
        okText: '确认',
        cancelText: '取消',
        onOk: async()=>{
            // 修改发货状态
            debugger
            await changeTransportStatus({id:record._id})
           const res = await getDeliveryRecordList() 
           if(res?.code === 200 ){
                 props?.dispatch({
                type:'deliveryRecord/saveList',
                payload:{
                    list:res.data
                }
            })
           }
          
            // props?.dispatch({
            //     type:'deliveryRecord/changeTransportStatus',
            //     payload:{
            //         id:record._id
            //     },
            //     callback:()=>{
            //         props?.dispatch({
            //             type: 'deliveryRecord/getList',
            //             payload: {
            //               current,
            //               pageSize,
            //             }
            //           })
            //     }
            // })
        }
      });
  }


  const columns: ProColumns<API.DeliveryListItem>[] =[
    {
      title: (
        <FormattedMessage
          id="pages.deliveryTable.Winning"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'prizeId',
      tip: 'The id is the unique key',
      search:false
    },
    {
      title: (
        <FormattedMessage
          id="pages.deliveryTable.addressee"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'userId',
      search:false
    },
    {
      title: (
        <FormattedMessage
          id="pages.deliveryTable.tel"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'phone',
      search:false
    },
    {
      title: (
        <FormattedMessage
          id="pages.deliveryTable.address"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'address',
      search:false
    },
    {
      title: (
        <FormattedMessage
          id="pages.deliveryTable.prize"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'name',
      search:false
    },
    {
      title: (
        <FormattedMessage
          id="pages.deliveryTable.transport"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'transport',
       valueEnum: {
        all: { text: '全部', status: 'Default' },
        true: {
            text: '已发货',
            status: 'Error',
        },
        false: {
            text: '未发货',
            status: 'Success',
        },
        },
        search:false
    },
    {
        title: '发货状态',
        key: 'deliveryStatus',
        hideInTable: true,
        dataIndex: 'transport',
        renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
          if (type === 'form') {
            return null;
          }
          return (
            <Select 
            options={[
                {
                  label: '已发货',
                  value: 1,
                },
                {
                  label: '未发货',
                  value: 2,
                },
                {
                    label: '全部',
                    value: 3,
                  },
              ]} 
              value={'全部'} 
              onChange={(value:string)=>{
                  console.log(value);
                  
                debugger
              }} 
              />
            // <MySelect
            //   {...rest}
            //   state={{
            //     type: stateType,
            //   }}
            // />
          );
        },
      },  
    {
        title: (
          <FormattedMessage
            id="pages.deliveryTable.deliveryOption"
            defaultMessage="ID"
          />
        ),
        dataIndex: 'prizeName',
        render:(text, record, _, action) => 
           [<Button type='link' disabled={record.transport}
              key="editable"
              onClick={() => {
                  // transport 为true  已发货 false 未发货
                  debugger
                  changeTransport(record)
              }}
            >
              { record.transport ? '已发货' : '发货' }
            </Button>]
          ,
          search:false
      },
  ]
//   const {deliveryRecord} = props.state

//   const { list } = deliveryRecord

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        // headerTitle={intl.formatMessage({
        //   id: 'pages.searchTable.title',
        //   defaultMessage: 'Enquiry form',
        // })}
        actionRef={actionRef}
        rowKey="key"
        // search={{
        //   labelWidth: 120,
        // }}
        // dataSource={list}
        // request={rule} // current pageSize
        request={
            props?.dispatch.bind(null, {
                type: 'deliveryRecord/getList',
                payload: {
                  current,
                  pageSize,
                }
              })
        // (params, sorter, filter) => {
        //     // 表单搜索项会从 params 传入，传递给后端接口。
                

        //     console.log(params, sorter, filter);
        //     return Promise.resolve({
        //       data: list,
        //       success: true,
        //     });
        //   }
    }
        // request={(params, sorter, filter) => {
        //     // 表单搜索项会从 params 传入，传递给后端接口。
        //     debugger
        //     console.log(params, sorter, filter);}
        // }
        // onSubmit={(params)=>{
        //     console.log(params);
            
        //     debugger

        // }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default connect(mapState)(TableList);
