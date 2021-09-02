import { request } from 'umi';

import requestUrl from '@/services/requestUrl';

export async function savePrizeInfo(body: any) {
    return request(`${requestUrl}/serve/setLottery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });
  }