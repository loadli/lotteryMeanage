import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';

export default () => {
  return (
    <Form labelCol={{ span: 4 }} style={{ width: '60%', margin: 'auto' }}>
      <Form.Item label="奖品名称">
        <Input />
      </Form.Item>
      <Form.Item label="奖品类型">
        <Select>
          <Select.Option value="1">01</Select.Option>
          <Select.Option value="2">02</Select.Option>
          <Select.Option value="3">03</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="放奖时间">
        <DatePicker />
      </Form.Item>
      <Form.Item label="奖品总数">
        <InputNumber min={1} max={10} defaultValue={3} />
      </Form.Item>
      <Form.Item label="剩余奖品">
        <InputNumber min={1} max={10} defaultValue={3} />
      </Form.Item>
      <Form.Item label="中奖率 ">
        <InputNumber min={1} max={100} defaultValue={3} />%
      </Form.Item>
    </Form>
  );
};
