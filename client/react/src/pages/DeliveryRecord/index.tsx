import { Button, Modal, Select } from 'antd';
import React, { useState, useRef } from 'react';
import {  FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { changeTransportStatus, getDeliveryRecordList } from './services'

const mapState = (state: any) => {
  return {
    list: state?.deliveryRecord?.list
  }
}

const TableList: React.FC = (props) => {

  const actionRef = useRef<ActionType>();

  /**
   * 设置页数和数据大小
   */
  const [ current, setCurrent ] = useState(1);
  const [ pageSize, setPageSize ] = useState(20);

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
           if(res?.code === '200' ){
                 props?.dispatch({
                type:'deliveryRecord/saveList',
                payload:res.data
            })
            //  actionRef.current.reload()
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
  const [ searchList, setsearchList ] = useState([])

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
            //   value={'全部'} 
              onChange={(value:string)=>{
                  let newData = []
                  console.log(value);
                  if(value === '1'){
                    newData = searchList.filter(item => {
                        return  item.transport === true
                    })
                    props?.dispatch({
                        type:'deliveryRecord/saveList',
                        payload:newData
                        })
                  }else if(value === '2'){
                    newData = searchList.filter(item => {
                        return  item.transport === false
                  })
                  props?.dispatch({
                    type:'deliveryRecord/saveList',
                    payload:newData
                    })
                }else{
                    props?.dispatch({
                        type: 'deliveryRecord/getList',
                        payload: {
                          current,
                          pageSize,
                        },
                        callback:(rr:any)=>{
                            setsearchList(rr.data)
                        }
                      })
                }
                debugger
               
              }
            } 
              />
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
              key="Math.random()"
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

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        dataSource={props.list || []}
        // request={rule} // current pageSize
        request={
            async (params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
           props?.dispatch({
              type: 'deliveryRecord/getList',
              payload: {
                current,
                pageSize,
              },
              callback:(rr:any)=>{
                  setsearchList(rr.data)
              }
            })
            return {
              data: props.list,
              success: true,
            };
          }
    }
        columns={columns}
      />
    </PageContainer>
  );
};

export default connect(mapState)(TableList);
