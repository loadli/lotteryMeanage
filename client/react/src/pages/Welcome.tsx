import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
            <img src={require("@/assets/welcome.svg")}></img>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
