import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, message, Row, Col } from 'antd';
import { savePrizeInfo } from '../services'

export default (props: any) => {
    const { record, form, handleOk } = props
    const { getFieldsValue } = form
    if (!record) return
    console.log(record, '123123');

    const onFinish = async (values: any) => {
        debugger
        const subData = {
            id: record._id,
            name: values.name,
            type: values.type,
            probability: values.probability,
            enableDatetime: values.enableDatetime,
            prizeSum: values.prizeSum,
            prizeRemain: values.prizeRemain,
            image: values.image
        }
        console.log('Success:', values);
        const res: any = await savePrizeInfo({ ...subData })
        if (res.code === '200') {
            message.success('您已成功修改奖品信息！')
        }
        else {
            message.error('啊哦~修改失败啦！')
        }
        handleOk()
    };

    return (
        <Form form={form}
            labelCol={{ span: 4 }}
            style={{ width: '60%', margin: 'auto' }}
            onFinish={onFinish}
            initialValues={{
                'name': record?.name,
                'image': record.image,
                'type': record.type,
                'enableDatetime': record.enableDatetime,
                'prizeSum': record.prizeSum,
                'prizeRemain': record.prizeRemain,
                'probability': record.probability,
            }}
        >
            <Form.Item label="奖品名称" name='name'>
                <Input />
            </Form.Item>
            <Form.Item label="奖品图片" name='image' >
                <Input />
            </Form.Item>
            {/* <image src={require(getFieldsValue('image'))}></image> */}
            <Form.Item label="奖品类型" name='type' >
                <Select style={{ width: '20%', margin: 'auto' }}>
                    <Select.Option value="01">虚拟</Select.Option>
                    <Select.Option value="02">实物</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="放奖时间" name='enableDatetime' >
                <DatePicker showTime />
            </Form.Item>
            <Form.Item label="奖品总数" name='prizeSum' >
                <InputNumber min={1} max={100} />
            </Form.Item>
            <Form.Item label="剩余奖品" name='prizeRemain' >
                <InputNumber min={1} max={100} />
            </Form.Item>
            <Form.Item label="中奖率">
                <Form.Item name='probability' noStyle>
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
    );
};
