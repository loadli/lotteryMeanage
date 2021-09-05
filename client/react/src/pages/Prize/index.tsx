import {
  Button,
  message,
  Drawer,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Space,
} from 'antd';
import { useDebounceFn } from 'ahooks';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { connect } from 'dva';
import { savePrizeInfo } from './services';
import moment from 'moment';
import { isUrl } from '@/utils';
import { LoadingOutlined } from '@ant-design/icons';

const mapState = (state: any) => {
  return {
    list: state?.prize?.list,
  };
};

const PrizeTable: React.FC<{ dispatch: Function }> = (props) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const [currentRow, setCurrentRow] = useState<API.Prize>();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pr_record, setPr_record] = useState<any>({});

  const [fetchImageLoading, setFetchImageLoading] = useState(false);

  const imgInfo = useRef({
    reqId: 0,
    src: '',
  });

  const [form] = Form.useForm();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  React.useEffect(() => {
    form.resetFields();
  }, [pr_record]);

  const handleOk = () => {
    setIsModalVisible(false);
    actionRef.current?.reload();
  };

  const onFinish = async (values: any) => {
    const subData = {
      id: pr_record._id,
      name: values.name,
      type: values.type,
      probability: values.probability,
      enableDatetime: values.enableDatetime,
      prizeSum: values.prizeSum,
      prizeRemain: values.prizeRemain,
      image: values.image,
    };
    const res: any = await savePrizeInfo({ ...subData });
    if (res.code === '200') {
      message.success('您已成功修改奖品信息！');
    } else {
      message.error('啊哦~修改失败啦！');
    }
    handleOk();
  };
  const { run: onValuesChange } = useDebounceFn(
    async (changedValues: any) => {
      if (Reflect.has(changedValues, 'image')) {
        if (/https?/.test(changedValues.image)) {
          setFetchImageLoading(true);
          imgInfo.current.reqId++;
          const reqId = imgInfo.current.reqId;
          fetch(changedValues.image, { method: 'HEAD' })
            .then(
              () => {
                if (reqId === imgInfo.current.reqId) {
                  imgInfo.current = {
                    ...imgInfo.current,
                    src: changedValues.image,
                  };
                }
              },
              () => {
                if (reqId === imgInfo.current.reqId) {
                  imgInfo.current = {
                    ...imgInfo.current,
                    src: '',
                  };
                }
              },
            )
            .finally(() => {
              if (reqId === imgInfo.current.reqId) setFetchImageLoading(false);
            });
        } else {
          imgInfo.current = {
            ...imgInfo.current,
            src: '',
          };
          setFetchImageLoading(false);
        }
      }
    },
    { wait: 500 },
  );

  const columns: ProColumns<API.Prize>[] = [
    {
      title: <FormattedMessage id="pages.prizeTable.name" defaultMessage="Name" />,
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="pages.prizeTable.prizeRemain" defaultMessage="Prize Remain" />,
      dataIndex: 'prizeRemain',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.prizeTable.prizeSum" defaultMessage="Prize Sum" />,
      dataIndex: 'prizeSum',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.prizeTable.type" defaultMessage="Type" />,
      dataIndex: 'type',
      hideInSearch: true,
      render: (value) => {
        return <div>{String(value) === '01' ? '虚拟' : '实物'}</div>;
      },
    },
    {
      title: <FormattedMessage id="pages.prizeTable.probability" defaultMessage="Probability" />,
      dataIndex: 'probability',
      hideInSearch: true,
      render: (value, record, _, action) => {
        return <div>{String(value)}%</div>;
      },
    },
    {
      title: <FormattedMessage id="pages.prizeTable.enableDatetime" defaultMessage="Enable Time" />,
      dataIndex: 'enableDatetime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.prizeTable.enable" defaultMessage="Enable" />,
      dataIndex: 'enable',
      hideInSearch: true,
      render: (value) => {
        return <div>{String(value) === 'true' ? '是' : '否'}</div>;
      },
    },
    {
      title: <FormattedMessage id="pages.prizeTable.options" defaultMessage="Options" />,
      dataIndex: 'enable',
      hideInSearch: true,
      render: (value, record, _, action) => {
        return (
          <div>
            <Button
              type={String(value) === 'true' ? 'primary' : 'default'}
              onClick={async () => {
                await props.dispatch({
                  type: 'prize/transAble',
                  payload: {
                    _id: record._id,
                    enable: String(record.enable) === 'true' ? false : true,
                  },
                });
                action?.reload();
              }}
            >
              {String(value) === 'true' ? '禁用' : '启用'}
            </Button>
            <Button
              type="text"
              onClick={() => {
                setPr_record(record);
                imgInfo.current.src = record.image;
                setIsModalVisible(true);
              }}
            >
              编辑
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Prize, API.PageParams>
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
          return props?.dispatch({
            type: 'prize/getList',
            payload: {
              current: params.current || 1,
              pageSize: params.pageSize || 20,
              ...params,
            },
          });
        }}
        columns={columns}
        rowSelection={false}
      />
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
          <ProDescriptions<API.Prize>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.Prize>[]}
          />
        )}
      </Drawer>
      <Modal
        forceRender
        width={800}
        title="编辑奖品"
        visible={isModalVisible}
        footer={null}
        destroyOnClose={true}
        onCancel={handleOk}
        maskClosable={true}
        style={{ top: 60 }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          style={{ maxHeight: '70vh', overflow: 'auto' }}
          onFinish={onFinish}
          initialValues={{
            name: pr_record?.name,
            image: pr_record.image,
            type: pr_record.type,
            enableDatetime: moment(pr_record.enableDatetime),
            prizeSum: pr_record.prizeSum,
            prizeRemain: pr_record.prizeRemain,
            probability: pr_record.probability,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item label="奖品名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="奖品图片"
            name="image"
            required
            rules={[
              {
                validator: async (rule, val) => {
                  if (!val) return Promise.reject(Error(''));
                  if (isUrl(val)) return Promise.resolve();
                  return Promise.reject(Error('链接不合法'));
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          {imgInfo.current.src || fetchImageLoading ? (
            <Form.Item wrapperCol={{ offset: 6 }}>
              {fetchImageLoading ? (
                <LoadingOutlined />
              ) : (
                <img src={imgInfo.current.src} alt="图片不存在" width="260"/>
              )}
            </Form.Item>
          ) : (
            ''
          )}
          <Form.Item label="奖品类型" name="type" rules={[{ required: true }]}>
            <Select style={{ width: '20%', margin: 'auto' }}>
              <Select.Option value="01">虚拟</Select.Option>
              <Select.Option value="02">实物</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="放奖时间" name="enableDatetime" rules={[{ required: true }]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="奖品总数" name="prizeSum" rules={[{ required: true }]}>
            <InputNumber min={1} max={100} />
          </Form.Item>
          <Form.Item label="剩余奖品" name="prizeRemain" rules={[{ required: true }]}>
            <InputNumber min={1} max={100} />
          </Form.Item>
          <Form.Item label="中奖率" rules={[{ required: true }]}>
            <Form.Item name="probability" noStyle>
              <InputNumber min={1} max={100} />
            </Form.Item>
            <span className="ant-form-text"> %</span>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }} wrapperCol={{ offset: 6, span: 12 }}>
            <Space>
              <Button onClick={handleOk}>取消</Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default connect(mapState)(PrizeTable);
