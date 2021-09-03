import { Button, message, Drawer, Modal, Form, Input, Select, DatePicker, Row, Col, InputNumber } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { removeRule } from '@/services/ant-design-pro/api';
import { connect } from 'dva';
import { savePrizeInfo } from './services';
import moment from 'moment';
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Prize[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row._id),
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
        list: state?.prize?.list,
    };
};

const PrizeTable: React.FC<{ dispatch: Function }> = (props) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.Prize>();
    const [selectedRowsState, setSelectedRows] = useState<API.Prize[]>([]);

    /**
     * 设置页数和数据大小
     */
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pr_record, setPr_record] = useState<any>({});
    const [form] = Form.useForm();
    //   useEffect(async function () {
    //   const dispatch = props?.dispatch;
    //   const list = await dispatch({
    //     type: 'prize/getList',
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

    React.useEffect(() => {
        form.resetFields()
    }, [pr_record]);
    const handleOk = () => {
        setIsModalVisible(false);
        actionRef.current?.reload()
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
            image: values.image
        }
        const res: any = await savePrizeInfo({ ...subData })
        if (res.code === '200') {
            message.success('您已成功修改奖品信息！')
        }
        else {
            message.error('啊哦~修改失败啦！')
        }
        handleOk()

    };

    const columns: ProColumns<API.Prize>[] = [
        {
            title: <FormattedMessage id="pages.prizeTable.name" defaultMessage="Name" />,
            dataIndex: 'name',
        },
        {
            title: <FormattedMessage id="pages.prizeTable.prizeRemain" defaultMessage="Prize Remain" />,
            dataIndex: 'prizeRemain',
        },
        {
            title: <FormattedMessage id="pages.prizeTable.prizeSum" defaultMessage="Prize Sum" />,
            dataIndex: 'prizeSum',
        },
        {
            title: <FormattedMessage id="pages.prizeTable.type" defaultMessage="Type" />,
            dataIndex: 'type',
            render: (value) => {
                return <div>{String(value) === '01' ? '虚拟' : '实物'}</div>;
            },
        },
        {
            title: <FormattedMessage id="pages.prizeTable.probability" defaultMessage="Probability" />,
            dataIndex: 'probability',
            render: (value, record, _, action) => {
                return <div>{String(value)}%</div>;
            },
        },
        {
            title: <FormattedMessage id="pages.prizeTable.enableDatetime" defaultMessage="Enable Time" />,
            dataIndex: 'enableDatetime',
        },
        {
            title: <FormattedMessage id="pages.prizeTable.enable" defaultMessage="Enable" />,
            dataIndex: 'enable',
            render: (value) => {
                return <div>{String(value) === 'true' ? '是' : '否'}</div>;
            },
        },
        {
            title: <FormattedMessage id="pages.prizeTable.options" defaultMessage="Options" />,
            dataIndex: 'enable',
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
                        <Button type="text" onClick={() => {
                            setPr_record(record)
                            setIsModalVisible(true);
                        }}>
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
                // dataSource={list}
                // request={rule} // current pageSize
                request={(params) => {
                    return props?.dispatch({
                        type: 'prize/getList',
                        payload: {
                            current,
                            pageSize,
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
              &nbsp;&nbsp;
              <span>
                                <FormattedMessage
                                    id="pages.searchTable.totalServiceCalls"
                                    defaultMessage="Total number of service calls"
                                />{' '}
                                {selectedRowsState.reduce((pre, item) => pre + Number(item.prizeRemain)!, 0)}{' '}
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
                width={'70%'}
                title="编辑奖品"
                visible={isModalVisible}
                footer={null}
                destroyOnClose={true}
                onCancel={handleOk}
                maskClosable={true}
            >
                <Form form={form}
                    labelCol={{ span: 4 }}
                    style={{ width: '60%', margin: 'auto' }}
                    onFinish={onFinish}
                    initialValues={{
                        'name': pr_record?.name,
                        'image': pr_record.image,
                        'type': pr_record.type,
                        'enableDatetime': moment(pr_record.enableDatetime),
                        'prizeSum': pr_record.prizeSum,
                        'prizeRemain': pr_record.prizeRemain,
                        'probability': pr_record.probability,
                    }}
                >
                    <Form.Item label="奖品名称" name='name' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="奖品图片" name='image' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    {/* <image src={require(getFieldsValue('image'))}></image> */}
                    <Form.Item label="奖品类型" name='type' rules={[{ required: true }]}>
                        <Select style={{ width: '20%', margin: 'auto' }}>
                            <Select.Option value="01">虚拟</Select.Option>
                            <Select.Option value="02">实物</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="放奖时间" name='enableDatetime' rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item label="奖品总数" name='prizeSum' rules={[{ required: true }]}>
                        <InputNumber min={1} max={100} />
                    </Form.Item>
                    <Form.Item label="剩余奖品" name='prizeRemain' rules={[{ required: true }]}>
                        <InputNumber min={1} max={100} />
                    </Form.Item>
                    <Form.Item label="中奖率" rules={[{ required: true }]}>
                        <Form.Item name='probability' noStyle >
                            <InputNumber min={1} max={100} />
                        </Form.Item>
                        <span className="ant-form-text"> %</span>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24, offset: 16 }}>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button style={{ marginRight: 20 }} type="primary" onClick={handleOk}>
                                    取消
                    </Button>
                                <Button type="primary" htmlType="submit">
                                    确定
                    </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer>
    );
};

export default connect(mapState)(PrizeTable);
