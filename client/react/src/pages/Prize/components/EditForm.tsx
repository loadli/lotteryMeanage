import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';

export default () => {
  return (
    <Form labelCol={{ span: 4 }} style={{ width: '60%', margin: 'auto' }}>
      <Form.Item label="奖品名称">
        <Input />
      </Form.Item>
      <Form.Item label="奖品图片">
        <Input />
      </Form.Item>
      <Form.Item label="奖品类型">
        <Select style={{ width: '20%', margin: 'auto' }}>
          <Select.Option value="01">虚拟</Select.Option>
          <Select.Option value="02">实物</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="放奖时间">
        <DatePicker showTime />
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
