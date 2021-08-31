import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, InputNumber, Divider, message } from 'antd';
import { getOreUse, getOreInit, setOreInit, setOreUse } from '../../../services/lotteryBase';
import Tips from './Tips';
import { await } from '@umijs/deps/compiled/signale';

export default (): React.ReactNode => {
  const [oreInit, setInit] = useState(0);
  const [oreUse, setUse] = useState(0);
  useEffect(() => {
    async function initBase() {
      const initResult = await getOreInit();
      const useResult = await getOreUse();
      setInit(Number(initResult?.data?.oreInit));
      setUse(Number(useResult?.data?.oreUse));
    }
    initBase();
  }, []);
  const onInitChange = (value: number) => {
    setInit(value);
  };

  const onUseChange = (value: number) => {
    setUse(value);
  };
  const onSave = async () => {
    await setOreInit({ count: oreInit });
    await setOreUse({ count: oreUse });
    message.success('修改成功');
  };
  return (
    <PageContainer>
      <Card>
        <Form>
          <Form.Item label="初始矿石">
            <InputNumber min={1} defaultValue={2000} value={oreInit} onChange={onInitChange} /> 个
          </Form.Item>
          <Form.Item label="单次消耗">
            <InputNumber min={1} defaultValue={200} value={oreUse} onChange={onUseChange} /> 个
          </Form.Item>
          <Form.Item style={{ marginLeft: '70px' }}>
            <Button type="primary" htmlType="submit" onClick={onSave}>
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
