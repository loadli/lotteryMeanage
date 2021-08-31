import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, InputNumber, Divider } from 'antd';
import Tips from './Tips';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Form>
          <Form.Item label="初始矿石">
            <InputNumber min={100} max={999} defaultValue={300} /> 个
          </Form.Item>
          <Form.Item label="单次消耗">
            <InputNumber min={10} max={999} defaultValue={10} /> 个
          </Form.Item>
          <Form.Item style={{ marginLeft: '70px' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Tips />
      </Card>
    </PageContainer>
  );
};
